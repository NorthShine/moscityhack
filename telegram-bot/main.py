import logging

from aiogram import Bot, Dispatcher, executor, types
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.types.reply_keyboard import KeyboardButton
from httpx import AsyncClient
import validators
import yaml

with open('config.yml', 'r') as file:
    config = yaml.safe_load(file)


logging.basicConfig(level=logging.INFO)
storage = MemoryStorage()
bot = Bot(token=config['TELEGRAM_BOT_TOKEN'])
dp = Dispatcher(bot, storage=storage)
client = AsyncClient()

menu_keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
menu_keyboard.add('/url')
menu_keyboard.add('/text')
author_keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
author_keyboard.add(KeyboardButton('Я не знаю автора текста'))
title_keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True, selective=True)
title_keyboard.add(KeyboardButton('Я не знаю заголовок статьи'))


class URLForm(StatesGroup):
    url = State()


class TextForm(StatesGroup):
    text = State()
    author = State()
    title = State()


def collect_data(data):
    truth_percentage = data.get('truth_percentage')
    uniqueness_hits = data.get('uniqueness_hits')
    is_trusted_url = data.get('is_trusted_url')
    articles_urls = data.get('found_articles', 'Ссылка на статью не найдена')

    is_trusted_url = 'Да' if is_trusted_url else 'Нет'
    articles_urls_str = ''
    for url in articles_urls:
        articles_urls_str += '- ' + url + '\n'

    return f'Это правда с вероятностью: {truth_percentage}%\n' \
           f'Коэффициент уникальности текста: {uniqueness_hits}%\n' \
           f'Информация есть на доверенных сайтах: {is_trusted_url}\n' \
           f'Найденные релевантные ссылки:\n\n{articles_urls_str}' \



@dp.message_handler(commands=['start', 'help'])
async def send_welcome(message: types.Message):
    await message.reply('Привет! Это бот для проверки новостей, '
                        'сделанный для хакатона MoscowCityHack командой NorthShine.\n'
                        'Вставьте ссылку на новость или текст новости.'
                        ' Поиск может занять некоторое время', reply_markup=menu_keyboard)


@dp.message_handler(commands=['url'])
async def handle_url(message: types.Message):
    await URLForm.url.set()
    await message.answer('Введите ссылку на новость')


@dp.message_handler(commands=['text'])
async def handle_text(message: types.Message):
    await TextForm.text.set()
    await message.answer('Введите текст новости')


@dp.message_handler(state=URLForm.url)
async def search_by_url(message: types.Message, state: FSMContext):
    await state.finish()
    if validators.url(message.text):
        await message.answer('Подтверждение может занять некоторое время')
        response = await client.post(
            config['SEARCH_BY_URL'],
            json={'url': message.text},
            timeout=10000,
        )
        data = response.json()['data']

        if data.get('is_article') is False:
            await message.answer('Внимание: похоже вы указали ссылку не на статью, результаты могут быть некорректны')

        await message.answer(
            collect_data(data),
            reply_markup=menu_keyboard,
            disable_web_page_preview=True,
        )
    else:
        await message.answer('Ошибка: вы ввели некорректную ссылку', reply_markup=menu_keyboard)


@dp.message_handler(state=TextForm.text)
async def search_by_text(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        data['text'] = message.text
    await TextForm.next()
    await message.answer('Напишите имя автора текста', reply_markup=author_keyboard)


@dp.message_handler(state=TextForm.author)
async def process_author(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        if message.text != 'Я не знаю автора текста':
            data['author'] = message.text
        else:
            data['author'] = ''
    await TextForm.next()
    await message.answer('Напишите заголовок статьи', reply_markup=title_keyboard)


@dp.message_handler(state=TextForm.title)
async def process_title(message: types.Message, state: FSMContext):
    async with state.proxy() as data:
        if message.text != 'Я не знаю заголовок статьи':
            data['title'] = message.text
        else:
            data['title'] = ''
    await message.answer('Подтверждение может занять некоторое время')

    async with state.proxy() as data:
        text = data.get('text')
        author = data.get('author')
        title = data.get('title')
    await state.finish()

    response = await client.post(
        config['SEARCH_BY_TEXT'],
        json={
            'text': text,
            'author': author,
            'title': title,
        },
        timeout=10000,
    )
    data = response.json()['data']
    await message.answer(
        collect_data(data),
        reply_markup=menu_keyboard,
        disable_web_page_preview=True,
    )


if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)

import { Fade, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useStyles } from 'hooks/useStyles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { Analytics } from 'components/Analytics';
import styles from './styles';
import { GradientButton } from '../../ui/GradientButton';
import { checkTextAction, checkUrlAction } from '../../store/reducers/news/actionCreators';
import { FADE_TIMEOUT } from '../../constants';
import { getAnalyticsAction } from '../../store/reducers/analytics/actionCreators';

type TabType = 'url' | 'text';

export const Home: React.FC = () => {
  const [tab, setTab] = useState<TabType>('url');
  const css = useStyles(styles, 'Home');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    url: '',
    text: '',
    title: '',
    author: ''
  });

  useEffect(() => {
    dispatch(getAnalyticsAction());
  });

  const handleChange = (event: React.SyntheticEvent, value: TabType) => {
    setTab(value);
  };

  const handleInputChange = useCallback((event: React.SyntheticEvent) => {
    const { value, name } = (event.target as HTMLInputElement);
    setData((state: typeof data) => ({
      ...state,
      [name]: value
    }));
  }, []);

  const handleUrlSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(checkUrlAction({
      url: data.url
    }))
      .unwrap()
      .then(() => navigate('/result'));
  };

  const handleTextSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(checkTextAction({
      text: data.text,
      title: data.title,
      author: data.author
    }))
      .unwrap()
      .then(() => navigate('/result'));
  };

  return (
    <Container css={css.root} maxWidth="sm">
      <Typography css={css.title} variant="h4">Проверка на фейк</Typography>
      <Typography css={css.subtitle} variant="body1">
        Введите URL или текст, чтобы проверить новость на фейк.
      </Typography>
      <TabContext value={tab}>
        <Container css={css.tabs}>
          <TabList variant="fullWidth" onChange={handleChange} aria-label="tabs" centered>
            <Tab sx={styles.tab} label="Url" value="url" />
            <Tab sx={styles.tab} label="Текст" value="text" />
          </TabList>
        </Container>
        <TabPanel value="url">
          <Fade in timeout={FADE_TIMEOUT}>
            <form onSubmit={handleUrlSubmit}>
              <TextField
                value={data.url}
                css={css.input}
                label="Введите URL"
                name="url"
                onChange={handleInputChange}
                fullWidth
                required
              />
              <GradientButton
                variant="contained"
                color="secondary"
                type="submit"
                shadowed
                fullWidth
              >
                Проверить ссылку
              </GradientButton>
            </form>
          </Fade>
        </TabPanel>
        <TabPanel value="text">
          <Fade in timeout={FADE_TIMEOUT}>
            <form onSubmit={handleTextSubmit}>
              <TextField
                css={css.input}
                value={data.text}
                label="Введите текст"
                name="text"
                onChange={handleInputChange}
                rows={4}
                multiline
                fullWidth
                required
              />
              <TextField
                css={css.input}
                value={data.title}
                name="title"
                onChange={handleInputChange}
                label="Введите заголовок"
                fullWidth
              />
              <TextField
                css={css.input}
                value={data.author}
                name="author"
                onChange={handleInputChange}
                label="Введите имя автора"
                fullWidth
              />
              <GradientButton
                variant="contained"
                color="secondary"
                type="submit"
                shadowed
                fullWidth
              >
                Проверить текст
              </GradientButton>
            </form>
          </Fade>
        </TabPanel>
      </TabContext>
      <Analytics />
    </Container>
  );
};

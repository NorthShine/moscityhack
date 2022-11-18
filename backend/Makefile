install_venv:
	@echo "====Installing backend dependencies===="
	@python -m pip install -r requirements.txt
	@echo "====Installing neural network dependencies===="
	@python -m pip install -r src/text_analysis/requirements.txt
	@python -m dostoevsky download fasttext-social-network-model

config:
	@bash build_config.sh

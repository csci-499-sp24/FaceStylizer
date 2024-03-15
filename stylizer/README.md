# Setup

## Dependencies
Install [Anaconda](https://www.anaconda.com/download)

Install dependencies + activate env
```
conda env create -f environment.yml
conda activate jjgan
```

To Start FastAPI Web Server
```
uvicorn main:app --reload
```
## Jupyter Notebook
Install python kernel for jupyter notebook
```
ipython kernel install --user --name=jjgan-kernel 
```

To Start jupyter notebook
```
jupyter notebook
```



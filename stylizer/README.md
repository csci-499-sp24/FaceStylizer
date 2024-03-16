# Setup

Install [Anaconda](https://www.anaconda.com/download)
1. Open Anaconda Prompt to check installed location
    ```
    where conda
    ```
2. Open Advanced System Settings and updated Environment Variables
    ```bash
    # Replace %username% with $USER on unix
    C:\Users\%username%\anaconda3\Scripts 

    C:\Users\%username%\anaconda3

    C:\Users\%username%\anaconda3\Library\bin
    ```
3. Install package and check versions
    ```bash
    conda install anaconda-navigator # type y when prompted

    conda --version # check conda version to verify install
    ```

Install dependencies + activate env
```
conda env create -f environment.yml
conda activate jjgan
```

Install python kernel for jupyter notebook
```
ipython kernel install --user --name=jjgan-kernel 
```

Start jupyter
```
jupyter notebook
```

import uvicorn
import sys
import os

if __name__ == "__main__":
    # Add current working directory to sys.path to fix ModuleNotFoundError
    sys.path.append(os.getcwd())
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

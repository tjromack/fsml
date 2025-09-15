FROM python:3.11-slim
WORKDIR /app

ENV PIP_NO_CACHE_DIR=1 PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

# install only the API deps
COPY apps/api/requirements.txt /tmp/req.txt
RUN pip install --no-cache-dir -r /tmp/req.txt

# copy code
COPY apps /app/apps

EXPOSE 8000
CMD ["uvicorn", "apps.api.main:app", "--host", "0.0.0.0", "--port", "8000"]

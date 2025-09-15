import os
import time
from redis import Redis
from rq import Queue, Worker

# job function(s)
def train_model(dataset_path: str) -> str:
    # placeholder long-running task
    time.sleep(5)
    return f"trained_on={dataset_path}"

if __name__ == "__main__":
    redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
    conn = Redis.from_url(redis_url)
    q = Queue("default", connection=conn)
    # Start a Worker that listens to "default"
    Worker([q], connection=conn).work()

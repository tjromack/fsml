from rq import Queue
from redis import Redis
from apps.worker.worker import train_model

if __name__ == "__main__":
    conn = Redis.from_url("redis://localhost:6379/0")
    q = Queue("default", connection=conn)
    job = q.enqueue(train_model, "data/samples/toy.csv")
    print("enqueued:", job.id)

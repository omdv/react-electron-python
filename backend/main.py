import time
import zmq
import json

CONNECTION_STRING = "tcp://127.0.0.1:5678"

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind(CONNECTION_STRING)

while True:
    #  Wait for next request from client
    message = socket.recv()
    print("Received operation: %s" % message)

    try:
      message = json.loads(message)
      message["value"] = message["value"] + message["operator"]
      time.sleep(5)
      socket.send_json(message)
    except:
      message["error"] = "Failed to calculate"

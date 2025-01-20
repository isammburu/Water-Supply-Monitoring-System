# backend/scripts/iot_simulation.py
import random
import time
from app import app, insert_data

def simulate_data():
    while True:
        water_level = random.uniform(100, 500)  # Water level in liters
        flow_rate = random.uniform(1, 10)  # Flow rate in liters/second
        insert_data(water_level, flow_rate)
        print(f"Simulated Data - Water Level: {water_level}L, Flow Rate: {flow_rate}L/s")
        time.sleep(5)  # Simulate every 5 seconds

if __name__ == "__main__":
    simulate_data()
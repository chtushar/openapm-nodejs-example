#!/bin/bash

while true; do
  # Create 10000 orders
  for i in {1..10000}; do
    curl -X POST -H "Content-Type: application/json" -d '{
      "customerName": "Customer'"$i"'",
      "product": "Product'"$i"'",
      "quantity": '"$i"'
    }' http://app:6080/orders
  done

  sleep 60 # Wait for 1 minute

  for i in {1..100}; do
    curl -X DELETE http://app:6080/orders/last
  done
done

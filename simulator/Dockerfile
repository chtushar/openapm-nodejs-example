FROM ubuntu:latest

# Install curl for simulator
RUN apt-get update && apt-get install -y curl

# Copy the simulator script
COPY simulate.sh /app/simulate.sh

# Make the script executable
RUN chmod +x /app/simulate.sh

CMD ["/app/simulate.sh"]

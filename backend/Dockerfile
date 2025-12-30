FROM python:3.9-slim

WORKDIR /app

# Copy the server script
COPY server.py .

# Create a data volume for persistence if needed, though bind mounts are better
# VOLUME /app/data

EXPOSE 3001

CMD ["python", "server.py"]
#!/bin/sh

# Maximum number of attempts
max_attempts=30
# Delay between attempts (in seconds)
delay=2

# Function to check if postgres is ready
check_postgres() {
  PGPASSWORD=$POSTGRES_PASSWORD psql -h "db" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT 1" >/dev/null 2>&1
}

# Wait for the database to be ready
echo "Waiting for postgres..."
for i in $(seq 1 $max_attempts); do
  if check_postgres; then
    echo "Postgres is up - executing migrations and seeding"
    break
  fi
  
  echo "Postgres is unavailable - sleeping"
  sleep $delay
  
  if [ $i -eq $max_attempts ]; then
    echo "Postgres is still unavailable after $max_attempts attempts. Exiting."
    exit 1
  fi
done

# Run migrations
echo "Running migrations..."
pnpm run migration:run
migration_exit_code=$?
if [ $migration_exit_code -ne 0 ]; then
  echo "Migration failed with exit code $migration_exit_code. Exiting."
  exit $migration_exit_code
fi

# Run seeding
echo "Seeding database..."
pnpm run seed
seeding_exit_code=$?
if [ $seeding_exit_code -ne 0 ]; then
  echo "Seeding failed with exit code $seeding_exit_code. Exiting."
  exit $seeding_exit_code
fi

# Start the application
echo "Starting the application..."
exec "$@"
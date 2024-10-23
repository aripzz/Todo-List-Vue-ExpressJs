## Getting Started

These instructions will help you get the project up and running on your local machine.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Dbmate](https://github.com/amacneil/dbmate)
- [nvm](https://nvm.sh/)

### Usage

Explain how to use the project and provide examples.
1. **Clone Repository**

   Clone repositori:

   ```shell
   git clone https://github.com/aripzz/Todo-List-Vue-ExpressJs
   cd Todo-List-Vue-ExpressJs/Todo-backend
    ```

2. **Create .env File**

   Copy the example environment file:

   ```shell
    cp .env.example .env
    ```

3. **Start the Docker Compose**

   ```shell
    docker-compose up --build
    ```
   Run Containers in Detached Mode (containers will run in the background):
   ```shell
    docker-compose up --build -d
    ```

4. **Start the Migration**
   ```shell
    dbmate up
    ```

5. **Services**
- API                   = http://localhost:3000
- Postgree Database     = localhost:5432

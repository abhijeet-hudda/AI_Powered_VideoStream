from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    HOST: str
    PORT: int
    DEBUG: bool
    EMBEDDING_MODEL: str
    PINECONE_API_KEY: str
    PINECONE_INDEX: str
    PINECONE_CLOUD: str
    PINECONE_REGION: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()
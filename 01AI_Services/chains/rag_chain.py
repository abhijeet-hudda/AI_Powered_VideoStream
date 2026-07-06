from langchain_core.runnables import (
    RunnableLambda,
    RunnableParallel,
)

from langchain_core.output_parsers import StrOutputParser

from models.llm_model import llm

from prompts.qa_prompt import QA_PROMPT

from utils.formatter import format_documents

from services.retrieval_service import retrieval_service


rag_chain = (

    RunnableParallel(

        context=RunnableLambda(

            lambda x: format_documents(

                retrieval_service.retrieve(
                    question=x["question"],
                    video_id=x["video_id"],
                )

            )

        ),

        question=RunnableLambda(
            lambda x: x["question"]
        ),

    )

    |

    QA_PROMPT

    |

    llm

    |

    StrOutputParser()

)
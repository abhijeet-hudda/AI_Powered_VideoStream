# from langchain_core.runnables import (
#     RunnableLambda,
#     RunnableParallel,
# )

# from langchain_core.output_parsers import StrOutputParser

# from models.llm_model import model

# from prompts.qa_prompt import QA_PROMPT

# from utils.formatter import format_documents

# from services.retrieval_service import retrieval_service


# rag_chain = (

#     RunnableParallel(

#         context=RunnableLambda(

#             lambda x: format_documents(

#                 retrieval_service.retrieve(
#                     question=x["question"],
#                     video_id=x["video_id"],
#                 )

#             )

#         ),

#         question=RunnableLambda(
#             lambda x: x["question"]
#         ),

#     )

#     |

#     QA_PROMPT

#     |

#     model

#     |

#     StrOutputParser()

# )

from langchain_core.runnables import (
    RunnableLambda,
    RunnableParallel,
)

from langchain_core.output_parsers import StrOutputParser

from models.llm_model import model
from prompts.qa_prompt import QA_PROMPT
from utils.formatter import format_documents
from services.retrieval_service import retrieval_service


def get_context(x):
    docs = retrieval_service.retrieve(
        question=x["question"],
        video_id=x["video_id"],
    )

    print("\n" + "=" * 80)
    print("QUESTION:")
    print(x["question"])
    print("=" * 80)

    print(f"Retrieved {len(docs)} documents\n")

    for i, doc in enumerate(docs, 1):
        print(f"Document {i}")
        print("Metadata:", doc.metadata)
        print("Content:")
        print(doc.page_content)
        print("-" * 80)

    context = format_documents(docs)

    print("\nFORMATTED CONTEXT:")
    print(context)
    print("=" * 80 + "\n")

    return context


rag_chain = (
    RunnableParallel(
        context=RunnableLambda(get_context),
        question=RunnableLambda(lambda x: x["question"]),
    )
    | QA_PROMPT
    | model
    | StrOutputParser()
)
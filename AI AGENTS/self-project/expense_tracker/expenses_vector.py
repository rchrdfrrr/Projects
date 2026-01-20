from langchain_ollama import OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import pandas as pd

df = pd.read_csv("Money_Tracker_January.csv")
embeddings = OllamaEmbeddings(model="mxbai-embed-large")

db_location = "./chrome_langchain_db"
add_documents = not os.path.exists(db_location)

if add_documents:
    documents = []
    ids = []

    for i, row in df.iterrows():
        document = Document(
            page_content= f"{row['Category']} " + str(row['Expenses']) + " " + row["Date"],
            metadata={"date": row["Date"]},
            id=str(i)
        )
        ids.append(str(i))
        documents.append(document)

vector_store = Chroma(
    collection_name="expenses",
    persist_directory=db_location,
    embedding_function=embeddings
)

if add_documents:
    vector_store.add_documents(documents=documents, ids=ids)

retriever = vector_store.as_retriever(
    search_kwargs={"k": 20},
)

# # View all stored documents and metadata
# all_docs = vector_store.get(include=['documents', 'metadatas'])
# print("Stored Documents in Chroma Database:")
# for i, (doc, meta) in enumerate(zip(all_docs['documents'], all_docs['metadatas'])):
#     print(f"{i+1}. Document: {doc}")
#     print(f"   Metadata: {meta}")
#     print("---")
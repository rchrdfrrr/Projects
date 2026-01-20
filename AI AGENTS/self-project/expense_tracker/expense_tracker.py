from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from expenses_vector import retriever


model = OllamaLLM(model="llama3.2")

template = """
You are an expert in answering financial and expense tracking questions.

Here are the expense details: {expense}

Here is the question to answer: {question}
"""

prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

while True:
    print("\n\n-------------------")
    question = input("Enter your question about your expenses (or 'exit' to quit): ")
    print("\n\n-------------------")

    if question.lower() == 'exit':
        break
    
    expense = retriever.invoke(question)
    result = chain.invoke({"expense": expense, "question": question})
    print(result)


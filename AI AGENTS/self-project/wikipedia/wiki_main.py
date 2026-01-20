from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_classic.agents import create_tool_calling_agent
from langchain_classic.agents import AgentExecutor

load_dotenv()  # Load environment variables from .env file

class ResearchResponse(BaseModel):
    topic: str
    summary: str
    important_dates: list[str]
    tools_used : list[str]
    sources: list[str]

llm = OllamaLLM(model="smallthinker")

parser = PydanticOutputParser(pydantic_object=ResearchResponse)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", 
        """
        You are a research assistant that provides detailed research summaries on various topics.
        Answer the user query and use necessary tools.
        Wrap the output in this format and provide no other text\n{format_instructions}
        """,
        ),
        ("placeholder", "{chat_history}"),
        ("human", "{query}"),
        ("placeholder", "{agent_scratchpad}"),
    ]
).partial(format_instructions=parser.get_format_instructions())

agent = create_tool_calling_agent(
    llm=llm,
    prompt=prompt,
    tools=[]  # Add any tools you want the agent to use
)

agent_executor = AgentExecutor(agent=agent, tools=[], verbose=True)
raw_response = agent_executor.invoke({"query": input("Enter your research question: ")})
print(raw_response)
from openai import OpenAI

client = OpenAI(api_key='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')

def trunc(num):
    return int(1000 * num) / 1000

def get_response(scores):
    input_text = f"""You are analyzing proposed shapes of 
    congressional districts and determining if they may be
    reflective of gerrymandering. A sketched district shape
    has an area of {trunc(scores['area'])}, a perimeter of {trunc(scores['perimeter'])},
    with a Polsby-Popper compactness score of {trunc(scores['pp'])}, a 
    Schwartzberg compactness score of {trunc(scores['schwartz'])}, a
    Reock compactness score of {trunc(scores['reock'])}, a Convex Hull
    compactness score of {trunc(scores['convex'])}, and a Length-Width
    compactness score of {trunc(scores['lw'])}. Given this information,
    explain in detail whether the district might be gerrymandered
    and why. Provide specific comparisons between this district
    and real-world historical examples of gerrymandering, and
    suggestions on how the shape of the district might be modified
    to improve its fairness, if necessary."""

    # return input_text
    completion = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=[
            {"role": "user", "content": input_text}
        ]
    )
    
    return completion.choices[0].message.content


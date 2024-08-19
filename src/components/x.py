# def simulate_lift():
#     # Read number of floors with requests
#     num_floors = int(input())
    
#     # Read the floor numbers
#     floors = list(map(int, input().split()))
    
#     # Read the number of people on each floor
#     people_on_floors = list(map(int, input().split()))

#     # Combine floors and number of people into a list of tuples
#     requests = list(zip(floors, people_on_floors))
    
#     # Sort requests by floor in descending order
#     requests.sort(reverse=True, key=lambda x: x[0])

#     current_time = 0
#     current_floor = 0

#     while requests:
#         # Lift capacity handling: fill the lift with up to 10 people
#         lift_capacity = 10
#         trip_requests = []

#         for i, (floor, people) in enumerate(requests):
#             if lift_capacity == 0:
#                 break
            
#             if people <= lift_capacity:
#                 lift_capacity -= people
#                 trip_requests.append((floor, people))
#             else:
#                 trip_requests.append((floor, lift_capacity))
#                 requests[i] = (floor, people - lift_capacity)
#                 lift_capacity = 0

#         # Remove fully served floors from the request list
#         requests = [r for r in requests if r not in trip_requests]

#         # Serve the trip requests
#         max_floor = max([floor for floor, _ in trip_requests])
#         current_time += abs(max_floor - current_floor) + max_floor
#         current_floor = 0

#     return current_time


# print(simulate_lift())

def can_achieve_top_k(N, M, K, scores):
    # Step 1: Calculate the current marks for each student
    current_marks = [sum(scores[i]) for i in range(N)]
    
    # Step 2: Calculate potential maximum marks by adding M to current marks
    potential_max_marks = [current_marks[i] + M for i in range(N)]
    
    # Step 3: Sort the potential max marks in descending order
    sorted_potential_max_marks = sorted(potential_max_marks, reverse=True)
    
    # Step 4: Determine if each student can achieve a top K rank
    results = []
    for i in range(N):
        if sorted_potential_max_marks.index(potential_max_marks[i]) < K:
            results.append("Yes")
        else:
            results.append("No")
    
    return results

# Example Usage:
N = 5  # Number of students
M = 800  # Maximum marks for each exam
K = 2  # Top K rank
scores = [
    [400, 600, 200],  # Student 1
    [430, 230, 203],  # Student 2
    [483, 293, 283],  # Student 3
    [182, 22, 1],  # Student 4
    [12, 192, 800]
]

print(can_achieve_top_k(N, M, K, scores))

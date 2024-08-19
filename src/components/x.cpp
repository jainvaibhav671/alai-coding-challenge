#include <iostream>
#include <vector>

using namespace std;

int main() {
	int N; cin >> N;
	vector<int> floors(N) = { 3, 2, 1 };
	// for (int i=0; i<N; i++) cin >> floors[i];

	vector<int> people(N) = { 1, 9, 10 }
;	// for (int i=0; i<N; i++) cin >> people[i];

	int curr_floor = 0;
	int total = 0;

	for (int i=0; i<N; i++) {
		if (people[i] > 0) {
			total += abs(floors[i] - curr_floor);
			curr_floor = floors[i];
		}
	}

	return total;
}

#include<stdio.h>
#include<stdlib.h>

int sum_div_by (int n, int t) {
    int p = t / n;
    return n * (p * (p + 1)) / 2;
}

int sum_divisible_by_3_or_5 () {
    int t = 999;
    return sum_div_by(3, t) + sum_div_by(5, t) - sum_div_by(15, t);

}

int main () {
    printf("%d", sum_divisible_by_3_or_5());
    return 0;
}

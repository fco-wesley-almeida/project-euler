#include<stdio.h>
#include<stdlib.h>
#define limit 4000000
int sum_of_even_fibo () {
    int a = 1;
    int b = 1;
    int c = a + b;
    int s = 0;
    while (c < 4000000) {
        s += c;
        a = b + c;
        b = c + a;
        c = a + b;
    }
    return s;
}
int main () {
    printf("%d\n", sum_of_even_fibo());
    return 0;
}

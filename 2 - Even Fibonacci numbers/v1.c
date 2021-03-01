#include<stdio.h>
#include<stdlib.h>

int sum_of_even_fibo () {
/*
    int size = 10;
    int *fibo_list = malloc (size * sizeof( int));
    unsigned long int sum = 2;
    int last_term = 2;
    int i = 2;
    fibo_list[0] = 1;
    fibo_list[1] = last_term;

    while (fibo_list[i-1] < 4000000) {
        fibo_list[i] = fibo_list[i-1] + fibo_list[i-2];
        printf("%d\n", fibo_list[i]);
        if (fibo_list[i] % 2 == 0) {
            sum += fibo_list[i];
        }
        if (i++ == size -1) {
            size *= 2;
            fibo_list = (int *) realloc(fibo_list, size * sizeof(int));
        }
    }
    free (fibo_list);
    return sum;
    */
    int sum;
    int a = 1;
    int b = 1;
    int h = 0;
    while (b < 4000000) {
        if (b % 2 == 0) {
            sum += b;
        }
        h = a + b;
        a = b;
        b = h;
    }
    return sum;
}
int main () {
    printf("%d\n", sum_of_even_fibo());
    return 0;
}

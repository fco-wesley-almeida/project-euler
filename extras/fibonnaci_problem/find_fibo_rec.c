#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#define  MAX_FIBO 64

unsigned long long int fibo (int n, unsigned long long int *fibo_store) {
    unsigned long long int fibo_number;
    if (fibo_store[n]) {
        return fibo_store[n];
    } else {
        if (n <= 1) {
            return 1;
        } else {
            fibo_number = fibo(n - 1, fibo_store) + fibo(n - 2, fibo_store);
            if (!fibo_store[n]) {
                fibo_store[n] = fibo_number;
            }
            return fibo_number;
        }
    }
}

int main ( int argc, char *argv[] ) {
    unsigned long long int *fibo_store;
    int response;
    int n;
    int valid_arg;
    if (argc > 1) {
        n = argc > 1 ? atoi(argv[1]) : 0;
        valid_arg = isdigit(*argv[1]) && n >= 0 && n <= MAX_FIBO;
        if (valid_arg) {
            fibo_store = (unsigned long long int*) malloc(sizeof(unsigned long long int) * MAX_FIBO);
            printf("%llu", fibo(n, fibo_store));
        } else {
            printf("The argument must be a number between 0 and 64.\n");
        }
        response = valid_arg ? EXIT_SUCCESS : EXIT_FAILURE;
    } else {
        printf("Insufficient arguments.\n");
        response = EXIT_FAILURE;
    }
    free(fibo_store);
    return response;
}

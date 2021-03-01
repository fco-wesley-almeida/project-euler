#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

unsigned long long int fibo (int n) {
    unsigned long long int x1;
    unsigned long long int x2;
    int i;
    x1 = 1;
    x2 = 1;
    for(i = 1; i < n; i++) {
        x1 = x2;
        x2 = x1 + x2;
    }
    return x2;
}

int main ( int argc, char *argv[] ) {
    int response;
    int n;
    int valid_arg;
    if (argc > 1) {
        n = argc > 1 ? atoi(argv[1]) : 0;
        valid_arg = isdigit(*argv[1]) && n >= 0 && n <= 64;
        if (valid_arg) {
            printf("%llu", fibo(n));
        } else {
            printf("The argument must be a number between 0 and 64.\n");
        }
        response = valid_arg ? EXIT_SUCCESS : EXIT_FAILURE;
    } else {
        printf("Insufficient arguments.\n");
        response = EXIT_FAILURE;
    }
    return response;
}

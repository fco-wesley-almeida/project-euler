#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#define MAX_FIBO 64

unsigned long long int *fibo_list_calc (int n) {
    unsigned long long int *v;
    int i;
    v = (unsigned long long int*) malloc(sizeof(unsigned long long int) * MAX_FIBO);
    for(i = 0; i < n; i++) {
        v[i] = i < 2 
            ? 1 
            : v[i - 1] + v[i - 2]; 
    }
    return v;
}

void print_vector_elements (unsigned long long int *v) {
    for (int i = 0; v[i]; i++) {
        printf("%llu\n", v[i]);    
    }
}

int main ( int argc, char *argv[] ) {
    int response;
    int n;
    int valid_arg;
    unsigned long long int *fibo_list;
    if (argc > 1) {
        n = argc > 1 ? atoi(argv[1]) : 0;
        valid_arg = isdigit(*argv[1]) && n >= 0 && n <= 64;
        if (valid_arg) {
            fibo_list = fibo_list_calc(n);
            print_vector_elements(fibo_list);
            free(fibo_list);
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

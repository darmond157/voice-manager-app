#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <unistd.h>
#include <sys/mman.h>
#include <string.h>

int main()
{
    int *shared_memory;
    int n;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    shared_memory = mmap(NULL, sizeof(int), PROT_READ | PROT_WRITE, MAP_SHARED | MAP_ANONYMOUS, -1, 0);
    if (shared_memory == MAP_FAILED)
    {
        perror("mmap");
        exit(1);
    }

    *shared_memory = n;

    pid_t pid = fork();

    if (pid < 0)
    {
        perror("fork");
        exit(1);
    }
    else if (pid == 0)
    {
        while (*shared_memory != 1)
        {
            if (*shared_memory % 2 == 0)
            {
                *shared_memory /= 2;
            }
            else
            {
                *shared_memory = 3 * (*shared_memory) + 1;
            }
            usleep(50000);
        }
        exit(0);
    }
    else
    {
        while (1)
        {
            printf("%d ", *shared_memory);
            fflush(stdout);
            if (*shared_memory == 1)
                break;
            usleep(50000);
        }
        printf("\n");

        wait(NULL);

        if (munmap(shared_memory, sizeof(int)) == -1)
        {
            perror("munmap");
            exit(1);
        }
    }

    return 0;
}

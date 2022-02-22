# desafio-ampulheta
Desafio para fazer uma ampulheta em JavaScript.

## Como utilizar?
Basta navegar até o diretório `desafio-ampulheta` e executar

```$ node hourglass.js <valor desejado>```

Exemplo:
```$ node hourglass.js 9```

E enfim printará a progressão dos estados da ampulheta no terminal desde o estado inicial:

```
#########
#########
# ##### #
#  ###  #
#   #   #
#  # #  #
# #   # #
##     ##
######### 
```

até o estado final:
```
#########
##     ##
# #   # #
#  # #  #
#   #   #
#  ###  #
# ##### #
#########
######### 
n = 9
```

## Minha experiência resolvendo o problema

### Modelagem dos estados
A princípio, o pensamento mais natural foi de utilizar uma matriz pra representar os estados, porém, com um pouco mais de reflexão, eu percebi que fazia mais sentido usar um array unidimensional, tendo em vista que basta saber quanta areia eu tenho em cada linha para determinar unicamente um estado.

### Printando os estados
Primeiramente, considerei ter uma variável que armazenasse o espaço vazio em cada linha da ampulheta, porém cheguei a uma solução um pouco mais "elegante", levando em conta que as diagonais do quadrado que contém a ampulheta delimitam o interior dela, bastava que tudo que estivesse entre as bordas do quadrado e os limites da ampulheta seria considerado espaço vazio. Sendo assim, a análise do interior da ampulheta se limitava a olhar para os valores de estado para cada linha e printar aquela quantidade de areia, de forma que o resto das posições poderiam ser completadas com espaço vazio.

### Atualizando o estado da ampulheta
Finalmente, precisávamos de um algoritmo que levasse a ampulheta de um estado para o próximo, de forma que conseguíssemos sair do estado inicial e eventualmente chegar ao estado final. A ideia utilizada foi sempre observar a distância da célula analisada à borda lateral. De forma que os grãos de areia fossem removidos um a um da camada mais superior que ainda contivesse areia até a camada mais inferior que ainda não estivesse completa de areia. Pela simetria do problema, quando acabasse a areia na metade superior da ampulheta, a metade inferior estaria completa.

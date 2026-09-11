/**
 * Logos de clientes — usados no carrossel do topo e na seção "Quem confia na
 * Folha".
 *
 * Vazio de propósito até chegarem os arquivos E a autorização de cada cliente.
 * Consultoria ambiental não publica nome de cliente por conta própria: estar
 * associado a um processo de licenciamento é informação que o cliente pode não
 * querer pública. Enquanto a lista estiver vazia, os dois blocos não renderizam
 * — nada de faixa vazia no ar.
 *
 * Para adicionar: coloque o arquivo em public/clientes/ (SVG ou PNG com fundo
 * transparente, de preferência monocromático) e inclua uma linha abaixo.
 *
 *   { nome: "Nome do Cliente", arquivo: "/clientes/nome-do-cliente.svg" },
 */
export interface LogoCliente {
  nome: string;
  arquivo: string;
}

export const LOGOS_CLIENTES: LogoCliente[] = [];

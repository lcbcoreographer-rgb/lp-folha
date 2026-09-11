/**
 * Logos de clientes — carrossel da seção Home e grade de "Quem confia na Folha".
 *
 * Origem: pasta "Clientes" enviada por Dayse Pastana, responsável pela marca da
 * Folha, num comentário do documento de copy do site.
 *
 * Os arquivos em public/clientes/ já estão tratados: margem vazia aparada e
 * tamanho igualado pela ÁREA, não pela altura. Com a mesma altura, um logo
 * quadrado pesa muito mais na faixa que um horizontal; com a mesma área, os
 * dois ocupam o mesmo espaço visual. Largura e altura abaixo são as de exibição
 * (os PNGs estão em 2x para tela de alta densidade).
 *
 * Para trocar ou incluir um logo, regerar com o mesmo tratamento — um arquivo
 * cru jogado aqui destoaria do resto da faixa.
 */
export interface LogoCliente {
  nome: string;
  arquivo: string;
  largura: number;
  altura: number;
}

export const LOGOS_CLIENTES: LogoCliente[] = [
  { nome: "BR Fértil", arquivo: "/clientes/br-fertil.png", largura: 149, altura: 31 },
  { nome: "Camboa Hotéis", arquivo: "/clientes/camboa-hoteis.png", largura: 137, altura: 34 },
  { nome: "Cargill", arquivo: "/clientes/cargill.png", largura: 101, altura: 46 },
  { nome: "Delta Fértil", arquivo: "/clientes/delta-fertil.png", largura: 51, altura: 52 },
  { nome: "Fertipar", arquivo: "/clientes/fertipar.png", largura: 73, altura: 52 },
  { nome: "G10 Transportes", arquivo: "/clientes/g10-transportes.png", largura: 129, altura: 36 },
  { nome: "Gen Fertilizantes", arquivo: "/clientes/gen-fertilizantes.png", largura: 117, altura: 40 },
  { nome: "Harbor Operações Portuárias", arquivo: "/clientes/harbor.png", largura: 114, altura: 41 },
  { nome: "JCM Participações", arquivo: "/clientes/jcm.png", largura: 107, altura: 43 },
  { nome: "JRL", arquivo: "/clientes/jrl.png", largura: 110, altura: 42 },
  { nome: "Luzzi Construtora", arquivo: "/clientes/luzzi.png", largura: 89, altura: 52 },
  { nome: "Miramar Transportes", arquivo: "/clientes/miramar.png", largura: 117, altura: 40 },
  { nome: "Panvel", arquivo: "/clientes/panvel.png", largura: 148, altura: 31 },
  { nome: "Pasa", arquivo: "/clientes/pasa.png", largura: 66, altura: 52 },
  { nome: "Rodofrota", arquivo: "/clientes/rodofrota.png", largura: 144, altura: 32 },
  { nome: "TCP", arquivo: "/clientes/tcp.png", largura: 106, altura: 44 },
  { nome: "Terin", arquivo: "/clientes/terin.png", largura: 128, altura: 36 },
];

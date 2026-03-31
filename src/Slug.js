export const Slug = text => 
  text
    .toString()
    .normalize('NFD')                 // Decompõe caracteres acentuados (ex: 'ã' vira 'a' + '~')
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos (diacríticos)
    .toLowerCase()                   // Passa tudo para minúsculo
    .trim()                          // Remove espaços no início e fim
    .replace(/\s+/g, '-')            // Substitui espaços por hifens
    .replace(/[^\w-]+/g, '')         // Remove tudo que não for letra, número ou hífen
    .replace(/--+/g, '-');           // Substitui múltiplos hifens por um só
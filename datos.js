// Respaldo del catálogo. Lo genera actualizar_respaldo.py: no editar a mano.
window.CATALOGO_RESPALDO = {
 "productos": [
  {
   "id": "rack3",
   "orden": 1,
   "categoria": "rack",
   "visible": true,
   "nombre": "Rack 3.0",
   "etiqueta": "Jaula completa",
   "bajada": "La jaula cerrada de la línea, la única. Va suelta, sin tocar la pared, y es el único que trae los soportes de seguridad incluidos.",
   "fotos": [
    "rack3_1",
    "rack3_2",
    "rack3_3",
    "rack3_4"
   ],
   "specs": [
    "Caño estructural 50×50 de 2 mm, perforado",
    "Parantes de 2150 mm",
    "Accesorios en chapa de 4,75 mm",
    "Guardas de acero inoxidable en los soportes de seguridad",
    "Pintura electrostática",
    "Logo cortado a láser"
   ],
   "fijacion": "Suelto",
   "tipo": "Jaula cerrada",
   "crece_a": "—",
   "nota_precio": "Precio contado"
  },
  {
   "id": "rack2",
   "orden": 2,
   "categoria": "rack",
   "visible": true,
   "nombre": "Rack 2.0",
   "etiqueta": "Abierto y suelto",
   "bajada": "Dos parantes con base en el piso. Es abierto, no es jaula, y va suelto: no hay que amurarlo.",
   "fotos": [
    "rack2_1",
    "rack2_2"
   ],
   "specs": [
    "Caño estructural 50×50 de 2 mm, perforado",
    "Parantes de 2150 mm",
    "Accesorios en chapa de 4,75 mm",
    "Pintura electrostática"
   ],
   "fijacion": "Suelto",
   "tipo": "Abierto",
   "crece_a": "Rack 3.0",
   "nota_precio": "Precio contado"
  },
  {
   "id": "rack1",
   "orden": 3,
   "categoria": "rack",
   "visible": true,
   "nombre": "Rack 1.0",
   "etiqueta": "Amurado a la pared",
   "bajada": "El más simple. Va amurado a la pared y te deja entrenar con peso libre con seguridad. Después se le suman piezas y pasa a 2.0 o 3.0.",
   "fotos": [
    "rack1_1",
    "rack1_2"
   ],
   "specs": [
    "Caño estructural 50×50 de 2 mm, perforado",
    "Parantes de 2200 mm",
    "Accesorios en chapa de 4,75 mm",
    "Pintura electrostática"
   ],
   "fijacion": "Amurado a la pared",
   "tipo": "Abierto",
   "crece_a": "Rack 2.0 o 3.0",
   "nota_precio": "Precio contado"
  },
  {
   "id": "multiangular",
   "orden": 4,
   "categoria": "otro",
   "visible": true,
   "nombre": "Banco multiangular",
   "etiqueta": "Regulable",
   "bajada": "Regula asiento y respaldo. Tiene ruedas para moverlo.",
   "fotos": [
    "multiangular_1",
    "multiangular_2",
    "multiangular_3",
    "multiangular_4",
    "multiangular_5",
    "multiangular_6",
    "multiangular_7",
    "multiangular_8",
    "multiangular_9",
    "multiangular_10"
   ],
   "specs": [
    "Caño estructural 80×40",
    "Regulación de asiento y respaldo",
    "Tapizado bordado en cuerina sintética reforzada",
    "Soldadura MIG",
    "Pintura electrostática",
    "Ruedas para moverlo"
   ],
   "fijacion": null,
   "tipo": null,
   "crece_a": null,
   "nota_precio": "Precio contado"
  },
  {
   "id": "plano",
   "orden": 5,
   "categoria": "otro",
   "visible": true,
   "nombre": "Banco plano",
   "etiqueta": "Plano",
   "bajada": "Banco plano con ruedas para moverlo.",
   "fotos": [
    "plano_1",
    "plano_2",
    "plano_3",
    "plano_4",
    "plano_5",
    "plano_6",
    "plano_7",
    "plano_8"
   ],
   "specs": [
    "Caño estructural 80×40",
    "Tapizado bordado",
    "Pintura electrostática",
    "Ruedas para moverlo"
   ],
   "fijacion": null,
   "tipo": null,
   "crece_a": null,
   "nota_precio": "Precio contado"
  },
  {
   "id": "hipthrust",
   "orden": 6,
   "categoria": "otro",
   "visible": true,
   "nombre": "Banco hip thrust",
   "etiqueta": "Hip thrust",
   "bajada": "Banco para hip thrust con apoyapié.",
   "fotos": [
    "hipthrust_1",
    "hipthrust_2",
    "hipthrust_3",
    "hipthrust_4",
    "hipthrust_5",
    "hipthrust_6",
    "hipthrust_7",
    "hipthrust_8"
   ],
   "specs": [
    "Caño estructural 50×50 de 2 mm",
    "Apoyapié con logo cortado a láser",
    "Guardas de acero inoxidable",
    "Pintura electrostática"
   ],
   "fijacion": null,
   "tipo": null,
   "crece_a": null,
   "nota_precio": "Precio contado"
  },
  {
   "id": "jack",
   "orden": 7,
   "categoria": "otro",
   "visible": true,
   "nombre": "Jack elevador",
   "etiqueta": "Accesorio",
   "bajada": "Levanta la barra cargada para poner o sacar discos sin agacharte.",
   "fotos": [
    "jack_1",
    "jack_2",
    "jack_3",
    "jack_4",
    "jack_5",
    "jack_6",
    "jack_7",
    "jack_8"
   ],
   "specs": [],
   "fijacion": null,
   "tipo": null,
   "crece_a": null,
   "nota_precio": "Consultar precio"
  }
 ],
 "piezas": [
  {
   "id": 27,
   "producto_id": "rack1",
   "orden": 1,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Parante vertical",
   "medida": "2200 mm",
   "detalle": "Perforado en las 4 caras",
   "fotos": [
    "render_parante",
    "pieza_parante"
   ]
  },
  {
   "id": 28,
   "producto_id": "rack1",
   "orden": 2,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Gancho J",
   "medida": null,
   "detalle": "Sostiene la barra cargada",
   "fotos": [
    "render_gancho-j",
    "gancho-j_1"
   ]
  },
  {
   "id": 29,
   "producto_id": "rack1",
   "orden": 3,
   "tipo": "incluido",
   "cantidad": 1,
   "pieza": "Barra de dominadas",
   "medida": "1110 mm",
   "detalle": "Caño de 27 mm (3/4″)",
   "fotos": [
    "render_barra-dominadas"
   ]
  },
  {
   "id": 30,
   "producto_id": "rack1",
   "orden": 4,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Lateral superior",
   "medida": "500 mm",
   "detalle": "Va a la pared",
   "fotos": [
    "render_lateral-superior"
   ]
  },
  {
   "id": 31,
   "producto_id": "rack1",
   "orden": 5,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Tapa con logo láser",
   "medida": "50 × 50 mm",
   "detalle": "Cierra cada caño",
   "fotos": [
    "pieza_tapa-logo"
   ]
  },
  {
   "id": 32,
   "producto_id": "rack1",
   "orden": 6,
   "tipo": "incluido",
   "cantidad": 4,
   "pieza": "Anclaje en L al piso",
   "medida": "70 × 50 mm",
   "detalle": "Chapa de 4,75 mm",
   "fotos": []
  },
  {
   "id": 33,
   "producto_id": "rack1",
   "orden": 7,
   "tipo": "incluido",
   "cantidad": 6,
   "pieza": "Planchuela de unión",
   "medida": "120 × 50 mm",
   "detalle": "4 ciegas y 2 con agujero para la barra",
   "fotos": []
  },
  {
   "id": 34,
   "producto_id": "rack1",
   "orden": 8,
   "tipo": "incluido",
   "cantidad": 8,
   "pieza": "Bulones",
   "medida": "1/2″ × 6 cm",
   "detalle": "Con arandelas",
   "fotos": []
  },
  {
   "id": 35,
   "producto_id": "rack1",
   "orden": 20,
   "tipo": "opcional",
   "cantidad": 2,
   "pieza": "Soporte de seguridad",
   "medida": "400 mm",
   "detalle": "Con guarda de acero inoxidable",
   "fotos": [
    "render_soporte-seguridad",
    "pieza_soporte-seguridad_1",
    "pieza_soporte-seguridad_2",
    "pieza_soporte-seguridad_3"
   ]
  },
  {
   "id": 36,
   "producto_id": "rack1",
   "orden": 21,
   "tipo": "opcional",
   "cantidad": 1,
   "pieza": "Porta discos",
   "medida": "400 mm",
   "detalle": "Caño de 45 mm con tapa con logo",
   "fotos": [
    "render_porta-discos",
    "pieza_porta-discos_1",
    "pieza_porta-discos_2"
   ]
  },
  {
   "id": 37,
   "producto_id": "rack1",
   "orden": 22,
   "tipo": "opcional",
   "cantidad": 1,
   "pieza": "Soporte de barra",
   "medida": null,
   "detalle": "Para dejar la barra reposando",
   "fotos": [
    "pieza_soporte-barra_1",
    "pieza_soporte-barra_2"
   ]
  },
  {
   "id": 15,
   "producto_id": "rack2",
   "orden": 1,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Parante vertical",
   "medida": "2150 mm",
   "detalle": "Perforado en las 4 caras",
   "fotos": [
    "render_parante",
    "pieza_parante"
   ]
  },
  {
   "id": 16,
   "producto_id": "rack2",
   "orden": 2,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Gancho J",
   "medida": null,
   "detalle": "Sostiene la barra cargada",
   "fotos": [
    "render_gancho-j",
    "gancho-j_1"
   ]
  },
  {
   "id": 17,
   "producto_id": "rack2",
   "orden": 3,
   "tipo": "incluido",
   "cantidad": 1,
   "pieza": "Barra de dominadas",
   "medida": "1110 mm",
   "detalle": "Caño de 27 mm (3/4″)",
   "fotos": [
    "render_barra-dominadas"
   ]
  },
  {
   "id": 18,
   "producto_id": "rack2",
   "orden": 4,
   "tipo": "incluido",
   "cantidad": 1,
   "pieza": "Travesaño de fondo",
   "medida": "1100 mm",
   "detalle": "Perforado en 2 caras",
   "fotos": [
    "render_fondo"
   ]
  },
  {
   "id": 19,
   "producto_id": "rack2",
   "orden": 5,
   "tipo": "incluido",
   "cantidad": 4,
   "pieza": "Escuadra de ángulo",
   "medida": "180 × 180 mm",
   "detalle": "Chapa de 4,75 mm",
   "fotos": [
    "render_escuadra",
    "pieza_escuadra-base"
   ]
  },
  {
   "id": 20,
   "producto_id": "rack2",
   "orden": 6,
   "tipo": "incluido",
   "cantidad": 6,
   "pieza": "Tapa con logo láser",
   "medida": "50 × 50 mm",
   "detalle": "Cierra cada caño",
   "fotos": [
    "pieza_tapa-logo"
   ]
  },
  {
   "id": 21,
   "producto_id": "rack2",
   "orden": 7,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Base lateral",
   "medida": "1300 mm",
   "detalle": "Perforada en 2 caras",
   "fotos": []
  },
  {
   "id": 22,
   "producto_id": "rack2",
   "orden": 8,
   "tipo": "incluido",
   "cantidad": 4,
   "pieza": "Planchuela de unión",
   "medida": "120 × 50 mm",
   "detalle": "2 ciegas y 2 con agujero para la barra",
   "fotos": []
  },
  {
   "id": 23,
   "producto_id": "rack2",
   "orden": 9,
   "tipo": "incluido",
   "cantidad": 16,
   "pieza": "Bulones",
   "medida": "1/2″ × 6 cm",
   "detalle": "Con arandelas",
   "fotos": []
  },
  {
   "id": 24,
   "producto_id": "rack2",
   "orden": 20,
   "tipo": "opcional",
   "cantidad": 2,
   "pieza": "Soporte de seguridad",
   "medida": "400 mm",
   "detalle": "Con guarda de acero inoxidable",
   "fotos": [
    "render_soporte-seguridad",
    "pieza_soporte-seguridad_1",
    "pieza_soporte-seguridad_2",
    "pieza_soporte-seguridad_3"
   ]
  },
  {
   "id": 25,
   "producto_id": "rack2",
   "orden": 21,
   "tipo": "opcional",
   "cantidad": 1,
   "pieza": "Porta discos",
   "medida": "400 mm",
   "detalle": "Caño de 45 mm con tapa con logo",
   "fotos": [
    "render_porta-discos",
    "pieza_porta-discos_1",
    "pieza_porta-discos_2"
   ]
  },
  {
   "id": 26,
   "producto_id": "rack2",
   "orden": 22,
   "tipo": "opcional",
   "cantidad": 1,
   "pieza": "Soporte de barra",
   "medida": null,
   "detalle": "Para dejar la barra reposando",
   "fotos": [
    "pieza_soporte-barra_1",
    "pieza_soporte-barra_2"
   ]
  },
  {
   "id": 1,
   "producto_id": "rack3",
   "orden": 1,
   "tipo": "incluido",
   "cantidad": 4,
   "pieza": "Parante vertical",
   "medida": "2150 mm",
   "detalle": "Perforado en las 4 caras",
   "fotos": [
    "render_parante",
    "pieza_parante"
   ]
  },
  {
   "id": 2,
   "producto_id": "rack3",
   "orden": 2,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Gancho J",
   "medida": null,
   "detalle": "Sostiene la barra cargada",
   "fotos": [
    "render_gancho-j",
    "gancho-j_1"
   ]
  },
  {
   "id": 3,
   "producto_id": "rack3",
   "orden": 3,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Soporte de seguridad",
   "medida": "400 mm",
   "detalle": "Con guarda de acero inoxidable",
   "fotos": [
    "render_soporte-seguridad",
    "pieza_soporte-seguridad_1",
    "pieza_soporte-seguridad_2",
    "pieza_soporte-seguridad_3"
   ]
  },
  {
   "id": 4,
   "producto_id": "rack3",
   "orden": 4,
   "tipo": "incluido",
   "cantidad": 1,
   "pieza": "Barra de dominadas",
   "medida": "1110 mm",
   "detalle": "Caño de 27 mm (3/4″)",
   "fotos": [
    "render_barra-dominadas"
   ]
  },
  {
   "id": 5,
   "producto_id": "rack3",
   "orden": 5,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Travesaño de fondo",
   "medida": "1100 mm",
   "detalle": "Perforado en 2 caras",
   "fotos": [
    "render_fondo"
   ]
  },
  {
   "id": 6,
   "producto_id": "rack3",
   "orden": 6,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Lateral superior",
   "medida": "500 mm",
   "detalle": "Une adelante con atrás",
   "fotos": [
    "render_lateral-superior"
   ]
  },
  {
   "id": 7,
   "producto_id": "rack3",
   "orden": 7,
   "tipo": "incluido",
   "cantidad": 8,
   "pieza": "Escuadra de ángulo",
   "medida": "180 × 180 mm",
   "detalle": "Chapa de 4,75 mm",
   "fotos": [
    "render_escuadra",
    "pieza_escuadra-base"
   ]
  },
  {
   "id": 8,
   "producto_id": "rack3",
   "orden": 8,
   "tipo": "incluido",
   "cantidad": 1,
   "pieza": "Chapa con logo",
   "medida": "1210 × 40 mm",
   "detalle": "Plegada a 90°",
   "fotos": [
    "render_chapa-logo",
    "pieza_chapa-logo"
   ]
  },
  {
   "id": 9,
   "producto_id": "rack3",
   "orden": 9,
   "tipo": "incluido",
   "cantidad": 8,
   "pieza": "Tapa con logo láser",
   "medida": "50 × 50 mm",
   "detalle": "Cierra cada caño",
   "fotos": [
    "pieza_tapa-logo"
   ]
  },
  {
   "id": 10,
   "producto_id": "rack3",
   "orden": 10,
   "tipo": "incluido",
   "cantidad": 2,
   "pieza": "Base lateral",
   "medida": "1300 mm",
   "detalle": "Perforada en 2 caras",
   "fotos": []
  },
  {
   "id": 11,
   "producto_id": "rack3",
   "orden": 11,
   "tipo": "incluido",
   "cantidad": 10,
   "pieza": "Planchuela de unión",
   "medida": "120 × 50 mm",
   "detalle": "8 ciegas y 2 con agujero para la barra",
   "fotos": []
  },
  {
   "id": 12,
   "producto_id": "rack3",
   "orden": 12,
   "tipo": "incluido",
   "cantidad": 50,
   "pieza": "Bulones",
   "medida": "1/2″ × 6 cm",
   "detalle": "Con arandelas",
   "fotos": []
  },
  {
   "id": 13,
   "producto_id": "rack3",
   "orden": 20,
   "tipo": "opcional",
   "cantidad": 1,
   "pieza": "Porta discos",
   "medida": "400 mm",
   "detalle": "Caño de 45 mm con tapa con logo",
   "fotos": [
    "render_porta-discos",
    "pieza_porta-discos_1",
    "pieza_porta-discos_2"
   ]
  },
  {
   "id": 14,
   "producto_id": "rack3",
   "orden": 21,
   "tipo": "opcional",
   "cantidad": 1,
   "pieza": "Soporte de barra",
   "medida": null,
   "detalle": "Para dejar la barra reposando",
   "fotos": [
    "pieza_soporte-barra_1",
    "pieza_soporte-barra_2"
   ]
  }
 ],
 "config": [
  {
   "clave": "instagram",
   "valor": "ironpulse_equipamientos"
  },
  {
   "clave": "subtitulo",
   "valor": "Hechos en la Patagonia. Elegí tu rack y mirá cada pieza de cerca."
  },
  {
   "clave": "titulo",
   "valor": "Racks de fabricación propia"
  },
  {
   "clave": "whatsapp",
   "valor": "542994594929"
  }
 ],
 "precios": [
  {
   "producto_id": "rack2",
   "pieza_id": null,
   "precio": 770615
  },
  {
   "producto_id": "rack1",
   "pieza_id": null,
   "precio": 571550
  },
  {
   "producto_id": "multiangular",
   "pieza_id": null,
   "precio": 1109750
  },
  {
   "producto_id": "plano",
   "pieza_id": null,
   "precio": 488750
  },
  {
   "producto_id": "hipthrust",
   "pieza_id": null,
   "precio": 776250
  },
  {
   "producto_id": "jack",
   "pieza_id": null,
   "precio": null
  },
  {
   "producto_id": "rack3",
   "pieza_id": null,
   "precio": 1477750
  },
  {
   "producto_id": "rack3",
   "pieza_id": 13,
   "precio": null
  },
  {
   "producto_id": "rack3",
   "pieza_id": 14,
   "precio": null
  },
  {
   "producto_id": "rack2",
   "pieza_id": 24,
   "precio": null
  },
  {
   "producto_id": "rack2",
   "pieza_id": 25,
   "precio": null
  },
  {
   "producto_id": "rack2",
   "pieza_id": 26,
   "precio": null
  },
  {
   "producto_id": "rack1",
   "pieza_id": 35,
   "precio": null
  },
  {
   "producto_id": "rack1",
   "pieza_id": 36,
   "precio": null
  },
  {
   "producto_id": "rack1",
   "pieza_id": 37,
   "precio": null
  }
 ]
};

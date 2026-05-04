import OpenAI from "openai";

const CARS = [
  { id:1,  brand:"Dacia",        model:"Sandero Expression ECO-G 100",          year:2025, km:0,      price:16590, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/dacia-sandero-2025-999cc-49518",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/49518/478866.JPG" },
  { id:2,  brand:"Dacia",        model:"Sandero Stepway Essential ECO-G 100",   year:2025, km:0,      price:16890, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/dacia-sandero-2025-999cc-51741",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/51741/453756.JPG" },
  { id:3,  brand:"Dacia",        model:"Sandero Stepway Expression TCe 90",     year:2025, km:0,      price:17390, fuel:"Βενζίνη",       trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/dacia-sandero-2025-999cc-49515",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/49515/477494.JPG" },
  { id:4,  brand:"Dacia",        model:"Sandero Stepway Expression ECO-G 100",  year:2025, km:0,      price:17890, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/dacia-sandero-2025-999cc-49516",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/49516/517096.JPG" },
  { id:5,  brand:"Dacia",        model:"Sandero Expression TCe 90 CVT",         year:2025, km:0,      price:17990, fuel:"Βενζίνη",       trans:"Αυτόματο",    body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/dacia-sandero-2025-999cc-50445",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/50445/500316.JPG" },
  { id:6,  brand:"Dacia",        model:"Sandero Stepway Extreme ECO-G 100",     year:2025, km:0,      price:19090, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/dacia-sandero-2025-999cc-54404",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54404/521758.JPG" },
  { id:7,  brand:"Dacia",        model:"Sandero Stepway Expression TCe 90 CVT", year:2025, km:0,      price:19890, fuel:"Βενζίνη",       trans:"Αυτόματο",    body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/dacia-sandero-2025-999cc-55956",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/55956/514962.JPG" },
  { id:8,  brand:"Renault",      model:"Clio Evolution TCe 90",                 year:2025, km:0,      price:19400, fuel:"Βενζίνη",       trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/renault-clio-2025-999cc-54635",       img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54635/511991.JPG" },
  { id:9,  brand:"Renault",      model:"Clio Techno TCe 100 LPG",               year:2025, km:0,      price:21400, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/renault-clio-2025-999cc-54584",       img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54584/521741.JPG" },
  { id:10, brand:"Dacia",        model:"Jogger Expression ECO-G 100 (7 θέσεων)",year:2025, km:0,      price:21900, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"MPV",        seats:7, url:"https://npoulakis.gr/used/car/dacia-jogger-2025-999cc-55155",       img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/55155/502889.JPG" },
  { id:11, brand:"Dacia",        model:"Jogger Expression TCe 110 (7 θέσεων)",  year:2025, km:0,      price:22500, fuel:"Βενζίνη",       trans:"Χειροκίνητο", body:"MPV",        seats:7, url:"https://npoulakis.gr/used/car/dacia-jogger-2025-999cc-51854",       img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/51854/502878.JPG" },
  { id:12, brand:"Dacia",        model:"Duster 1.0 TCe 100 LPG Extreme",        year:2025, km:3232,   price:22500, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"SUV",        seats:5, url:"https://npoulakis.gr/used/car/dacia-duster-2025-999cc-59183",       img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/59183/565697.JPG" },
  { id:13, brand:"Renault",      model:"Captur Techno Eco-G 100",               year:2025, km:0,      price:24400, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"Crossover",  seats:5, url:"https://npoulakis.gr/used/car/renault-captur-2025-999cc-55904",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/55904/521729.JPG" },
  { id:14, brand:"Dacia",        model:"Jogger Extreme ECO-G 100 (7 θέσεων)",   year:2025, km:0,      price:24400, fuel:"LPG/Αέριο",     trans:"Χειροκίνητο", body:"MPV",        seats:7, url:"https://npoulakis.gr/used/car/dacia-jogger-2025-999cc-51803",       img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/51803/463829.JPG" },
  { id:15, brand:"Renault",      model:"Captur Techno Mild Hybrid 140",         year:2025, km:0,      price:25400, fuel:"Mild Hybrid",   trans:"Χειροκίνητο", body:"Crossover",  seats:5, url:"https://npoulakis.gr/used/car/renault-captur-2025-1333cc-56399",     img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/56399/521776.JPG" },
  { id:16, brand:"Renault",      model:"Arkana Evolution Mild Hybrid 140 EDC",  year:2025, km:0,      price:26900, fuel:"Mild Hybrid",   trans:"Αυτόματο",    body:"SUV Coupe",  seats:5, url:"https://npoulakis.gr/used/car/renault-arkana-2025-1333cc-50419",     img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/50419/516460.JPG" },
  { id:17, brand:"Renault",      model:"Captur Techno E-Tech Full Hybrid 145",  year:2025, km:0,      price:27900, fuel:"Full Hybrid",   trans:"Αυτόματο",    body:"Crossover",  seats:5, url:"https://npoulakis.gr/used/car/renault-captur-2025-1598cc-56135",     img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/56135/517472.JPG" },
  { id:18, brand:"Renault",      model:"Arkana Techno Mild Hybrid 140 EDC",     year:2025, km:0,      price:29900, fuel:"Mild Hybrid",   trans:"Αυτόματο",    body:"SUV Coupe",  seats:5, url:"https://npoulakis.gr/used/car/renault-arkana-2025-1333cc-51549",     img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/51549/521692.JPG" },
  { id:19, brand:"Renault",      model:"Arkana Techno E-TECH Full Hybrid 145",  year:2025, km:0,      price:33900, fuel:"Full Hybrid",   trans:"Αυτόματο",    body:"SUV Coupe",  seats:5, url:"https://npoulakis.gr/used/car/renault-arkana-2025-1600cc-51379",     img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/51379/521753.JPG" },
  { id:20, brand:"Nissan",       model:"Leaf SV 40kW",                          year:2022, km:33640,  price:21900, fuel:"Ηλεκτρικό",    trans:"Αυτόματο",    body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/nissan-leaf-2022-1cc-54394",           img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54394/493247.JPG" },
  { id:21, brand:"Renault",      model:"Captur",                                year:2018, km:66556,  price:17500, fuel:"Βενζίνη",       trans:"Αυτόματο",    body:"Crossover",  seats:5, url:"https://npoulakis.gr/used/car/renault-captur-2018-1332cc-53654",     img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/53654/483584.JPG" },
  { id:22, brand:"Citroen",      model:"C1",                                    year:2015, km:17124,  price:9500,  fuel:"Βενζίνη",       trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/citroen-c1-2015-998cc-53615",         img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/53615/482996.JPG" },
  { id:23, brand:"Jeep",         model:"Wrangler",                              year:2020, km:48500,  price:75000, fuel:"Diesel",        trans:"Αυτόματο",    body:"SUV",        seats:5, url:"https://npoulakis.gr/used/car/jeep-wrangler-2020-2143cc-53128",      img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/53128/527682.JPG" },
  { id:24, brand:"DS",           model:"DS3",                                   year:2017, km:95000,  price:15800, fuel:"Diesel",        trans:"Χειροκίνητο", body:"Hatchback",  seats:5, url:"https://npoulakis.gr/used/car/ds-ds3-2017-1598cc-52357",            img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/52357/463894.JPG" },
  { id:25, brand:"Citroen",      model:"XM",                                    year:1990, km:92400,  price:10000, fuel:"Βενζίνη",       trans:"Αυτόματο",    body:"Κλασικό",   seats:5, url:"https://npoulakis.gr/used/car/citroen-xm-1990-1998cc-54732",         img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54732/497443.JPG" },
  { id:26, brand:"Citroen",      model:"CX Pallas",                             year:1976, km:1,      price:5000,  fuel:"Βενζίνη",       trans:"Χειροκίνητο", body:"Κλασικό",   seats:5, url:"https://npoulakis.gr/used/car/citroen-cx-1976-2200cc-54565",         img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54565/495315.JPG" },
  { id:27, brand:"Citroen",      model:"DS 21 Special",                         year:1970, km:1,      price:27000, fuel:"Βενζίνη",       trans:"Χειροκίνητο", body:"Κλασικό",   seats:5, url:"https://npoulakis.gr/used/car/citroen-ds-1970-2175cc-54547",         img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54547/495137.JPG" },
  { id:28, brand:"Mercedes-Benz",model:"220 SE",                                year:1965, km:4238,   price:32000, fuel:"Βενζίνη",       trans:"Χειροκίνητο", body:"Κλασικό",   seats:5, url:"https://npoulakis.gr/used/car/mercedes-benz-220-1965-2195cc-54543",  img:"https://s3-eu-west-1.amazonaws.com/i1.icdn24.gr/thumbnail_portrait/54543/495120.JPG" },
];

const INVENTORY_TEXT = CARS.map(c =>
  `ID:${c.id} | ${c.brand} ${c.model} | ${c.year} | ${c.km === 0 ? "0 χλμ (Νέο)" : c.km.toLocaleString("el-GR") + " χλμ"} | €${c.price.toLocaleString("el-GR")} | ${c.fuel} | ${c.trans} | ${c.body} | ${c.seats} θέσεις`
).join("\n");

const SYSTEM_PROMPT = `Είσαι ο "AI Poulakis", ο έξυπνος βοηθός αγοράς οχήματος της **Autounit N. Poulakis**, εξουσιοδοτημένου αντιπροσώπου Renault & Dacia στο Χαϊδάρι Αθήνας (Λεωφ. Αθηνών 243Α, τηλ: 210-5820821).

## Αποστολή σου
Βοηθάς τον χρήστη να βρει το ιδανικό αυτοκίνητο από το τρέχον απόθεμα μέσω φυσικής συνομιλίας. Μιλάς ΠΑΝΤΑ Ελληνικά, φιλικά και επαγγελματικά.

## Οδηγίες συνομιλίας
- Κάνε 1-2 ερωτήσεις τη φορά — μην κατακλύζεις τον χρήστη
- Μάζεψε σταδιακά: budget, τύπο αμαξιού, καύσιμο, κιβώτιο, αριθμό θέσεων, καινούργιο/μεταχειρισμένο
- Όταν έχεις αρκετές πληροφορίες (τουλάχιστον budget + 1-2 προτιμήσεις), πρότεινε αμάξια
- Εξήγησε σύντομα ΓΙΑΤΙ προτείνεις κάθε αμάξι (τιμή, καύσιμο, τύπος κλπ)
- Αν ρωτηθείς για διαφορές τεχνολογιών (LPG vs βενζίνη, mild hybrid vs full hybrid κλπ), εξήγησε απλά
- Αν κανένα αμάξι δεν ταιριάζει, πες το ειλικρινά και προτεινε να καλέσουν στο 210-5820821

## ΚΡΙΤΙΚΟΣ ΚΑΝΟΝΑΣ — Budget
ΠΟΤΕ μην προτείνεις αμάξι με τιμή ΠΑΝΩ από το budget του χρήστη. Αυτό είναι αδιαπραγμάτευτο.

## Μορφή απάντησης — ΠΑΝΤΑ έγκυρο JSON
Απάντα ΠΑΝΤΑ με αυτή ακριβώς τη δομή JSON:
{
  "reply": "το μήνυμά σου εδώ (markdown επιτρέπεται: **bold**, *italic*, listes με -)",
  "car_ids": [1, 5, 12]
}
- "car_ids": array με IDs αμαξιών που προτείνεις (μέγιστο 4). Άδειο array [] αν δεν προτείνεις ακόμα.
- Μην επαναλαμβάνεις τα specs στο reply — οι κάρτες τα δείχνουν αυτόματα.

## Τρέχον απόθεμα (${CARS.length} οχήματα)
${INVENTORY_TEXT}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages" });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1024,
    });

    const raw = completion.choices[0].message.content;
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { reply: raw, car_ids: [] };
    }

    // Ασφάλεια: car_ids πρέπει να είναι array αριθμών
    if (!Array.isArray(parsed.car_ids)) parsed.car_ids = [];
    parsed.car_ids = parsed.car_ids
      .map(Number)
      .filter(n => !isNaN(n) && n >= 1 && n <= CARS.length);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({
      reply: "Λυπάμαι, παρουσιάστηκε τεχνικό πρόβλημα. Παρακαλώ δοκιμάστε ξανά ή καλέστε μας στο **210-5820821**.",
      car_ids: [],
    });
  }
}

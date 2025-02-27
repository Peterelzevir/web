import React, { useState, useEffect, useRef } from 'react';

// Mock data for AI news
const aiNewsData = [
  // Berita Trending
  {
    id: 1,
    title: "FBI Menyatakan Korea Utara Bertanggung Jawab atas Peretasan Bybit Senilai $1,5 Miliar",
    date: "27 Februari 2025",
    summary: "FBI mengumumkan bahwa Korea Utara bertanggung jawab atas pencurian sekitar $1,5 miliar aset virtual dari bursa kripto Bybit.",
    content: "FBI telah mengidentifikasi Korea Utara sebagai pelaku di balik pencurian sekitar $1,5 miliar aset virtual dari bursa kripto Bybit. Aktivitas ini, yang disebut oleh FBI sebagai 'TraderTraitor', melibatkan konversi cepat aset yang dicuri menjadi bitcoin dan mata uang virtual lainnya, yang kemudian disebar ke berbagai alamat blockchain.\n\nAset-aset ini diperkirakan akan dicuci dan dikonversi menjadi mata uang fiat pada akhirnya. Investigasi yang dilakukan oleh FBI dan badan keamanan siber internasional menunjukkan pola serangan yang konsisten dengan kelompok peretas yang disponsori negara Korea Utara, khususnya Lazarus Group, yang telah terlibat dalam berbagai pencurian kripto besar sebelumnya.\n\nBybit, yang melayani lebih dari 60 juta pengguna dan menawarkan akses ke berbagai mata uang kripto, melaporkan bahwa seorang penyerang berhasil mengendalikan dompet ether dan mentransfer isinya ke alamat yang tidak dikenal. Serangan ini tampaknya memanfaatkan kerentanan dalam protokol keamanan multi-tanda tangan perusahaan.\n\nOtoritas internasional sekarang bekerja sama untuk melacak dan membekukan aset yang dicuri. Sementara itu, industri kripto dipaksa untuk mengevaluasi kembali prosedur keamanan mereka di tengah meningkatnya ancaman dari aktor yang disponsori negara. Insiden peretasan ini menjadi yang terbesar di tahun 2025 dan menambah kekhawatiran tentang keamanan aset digital di ekosistem kripto global.",
    trending: true
  },
  {
    id: 2,
    title: "CEO Nvidia: Model AI Seperti DeepSeek's R1 Membutuhkan 100 Kali Lebih Banyak Daya Komputasi",
    date: "27 Februari 2025",
    summary: "CEO Nvidia, Jensen Huang, menyoroti peningkatan permintaan daya komputasi yang didorong oleh model AI seperti DeepSeek's R1.",
    content: "Dalam panggilan pendapatan terbaru, CEO Nvidia, Jensen Huang, menekankan bahwa model AI seperti DeepSeek's R1 membutuhkan daya komputasi hingga 100 kali lebih besar dibandingkan model sebelumnya. Pernyataan ini datang di tengah-tengah kekhawatiran investor tentang potensi penurunan permintaan chip AI di masa depan.\n\nMeskipun Nvidia melampaui ekspektasi pendapatan dengan melaporkan pertumbuhan 137% year-over-year, mencapai $26,3 miliar pada kuartal terakhir, investor tetap berhati-hati. Kekhawatiran utama adalah bahwa peningkatan efisiensi model dapat mengurangi kebutuhan akan daya komputasi AI, yang merupakan bisnis inti Nvidia.\n\nHuang menjelaskan bahwa model penalaran seperti R1 sangat membutuhkan sumber daya komputasi yang intensif karena kemampuannya untuk melakukan pemikiran dan penalaran multi-langkah. \"Ini bukan hanya tentang memprediksi token berikutnya, ini tentang membangun jalur pemikiran yang kompleks, yang membutuhkan daya komputasi yang jauh lebih besar,\" jelasnya selama panggilan tersebut.\n\nMeskipun Nvidia tetap menjadi pemain dominan di pasar komputasi AI dengan pangsa pasar sekitar 80% untuk chip pelatihan AI, persaingan semakin meningkat, terutama dalam komputasi inferensi. Kompetitor baru dan chip AI kustom dari penyedia cloud seperti Google dan Amazon dapat mengurangi pangsa pasar Nvidia dalam komputasi inferensi hingga 50%, menurut analis dari Morgan Stanley.\n\nNamun, permintaan keseluruhan untuk chip berperforma tinggi Nvidia tetap kuat, didorong oleh kemajuan dalam aplikasi AI. Huang menekankan bahwa industri masih berada di awal revolusi AI, dan infrastruktur komputasi global akan terus beralih untuk mengakomodasi kebutuhan AI yang semakin meningkat.",
    trending: true
  },
  {
    id: 3,
    title: "Ilmuwan Inggris: 'Tidak Perlu Panik' Mengenai AI",
    date: "27 Februari 2025",
    summary: "Profesor Christopher Summerfield dari Google DeepMind menyarankan pendekatan seimbang terhadap kecerdasan buatan.",
    content: "Profesor Christopher Summerfield, seorang ilmuwan AI terkemuka di Google DeepMind dan profesor neuroscience di Wadham College, Oxford, menawarkan perspektif seimbang mengenai kecerdasan buatan (AI) dalam bukunya yang baru dirilis, \"The Human in the Machine: Navigating Our AI Future\".\n\nBerbeda dengan banyak orang di industri teknologi yang melihat AI sebagai solusi utama untuk masalah global, atau mereka di akademia yang memandangnya dengan skeptisisme mendalam, Summerfield memberikan pandangan yang lebih nuansa berdasarkan pengalamannya yang luas di kedua bidang tersebut.\n\n\"Saya pikir ada dua ekstrem dalam diskusi tentang AI saat ini,\" kata Summerfield dalam wawancara eksklusif. \"Di satu sisi, kita memiliki optimisme tekno-utopis yang melihat AI sebagai penyelamat bagi semua masalah kita. Di sisi lain, ada pesimisme dan ketakutan yang berlebihan. Kebenaran, seperti biasa, berada di suatu tempat di tengah-tengah.\"\n\nSummerfield mempertanyakan implikasi masa depan AI, merenungkan potensinya untuk membawa manfaat atau bahaya bagi umat manusia. Dia membahas kekhawatiran tentang masalah hak cipta yang disoroti oleh seniman terkemuka seperti kasus gugatan artis visual terhadap perusahaan AI generatif, dan penggunaan etis AI, seperti eksperimen data kontroversial yang dilakukan oleh perusahaan Elon Musk.\n\nMenariknya, Summerfield mencatat bahwa meskipun sistem AI seperti model bahasa besar menunjukkan kapasitas penalaran yang luar biasa dan kemampuan untuk menyelesaikan tugas kompleks, mereka tidak memiliki konteks emosional dan personal yang dimiliki manusia. \"Model-model ini dapat menulis puisi yang indah secara teknis, tetapi mereka tidak pernah merasakan patah hati yang menginspirasi banyak karya seni besar manusia,\" jelasnya.\n\nDia menekankan potensi AI untuk memicu perubahan sosial yang signifikan, termasuk penggantian pekerjaan dan potensi peningkatan ketidaksetaraan, dan menyoroti perlunya penggunaan teknologi yang hati-hati dan dipertimbangkan dengan baik. Model kebijakan yang dia usulkan mencakup investasi dalam pelatihan ulang pekerja yang terdampak, peraturan yang lebih kuat tentang penggunaan data, dan transparansi yang lebih besar dari perusahaan AI.\n\n\"Kekhawatiran saya bukan bahwa AI akan menjadi sadar dan mengambil alih dunia,\" katanya, \"tetapi bahwa kita akan menerapkannya tanpa cukup pemikiran tentang konsekuensi sosial dan ekonominya.\"\n\nAkhirnya, Summerfield mendesak manusia untuk menavigasi kemajuan AI dengan bijaksana, mengakui baik kemungkinan maupun keterbatasannya. \"Tidak perlu panik, tetapi juga tidak bijaksana untuk berpuas diri. AI adalah alat yang luar biasa yang dapat membawa manfaat luar biasa jika kita mengelolanya dengan bijak.\"",
    trending: true
  },
  {
    id: 4,
    title: "Amazon Memperkenalkan Alexa+ yang Didukung AI dengan Biaya Bulanan",
    date: "27 Februari 2025",
    summary: "Amazon meluncurkan Alexa+ yang ditingkatkan dengan AI generatif, menawarkan pengalaman yang lebih interaktif dan personal.",
    content: "Amazon telah memperkenalkan versi baru Alexa yang ditingkatkan dengan AI, disebut Alexa+, yang dirancang untuk memberikan pengalaman yang lebih interaktif dan personal bagi pengguna. Peluncuran ini menandai transformasi signifikan dari asisten suara yang telah ada selama hampir satu dekade.\n\nDiperkenalkan pada acara media yang mewah di New York, Alexa+ menampilkan serangkaian kemampuan baru yang mengesankan yang melampaui fungsionalitas dasar pendahulunya. Sistem yang baru dapat mendeteksi nada suara pengguna untuk menyesuaikan responsnya, merencanakan kencan romantis lengkap dengan rekomendasi restoran dan pengingat untuk membeli bunga, dan menawarkan interaksi lain yang jauh lebih mirip manusia daripada versi asli.\n\n\"Ini bukan hanya upgrade, ini adalah reinvention,\" kata Andy Jassy, CEO Amazon, selama presentasi. \"Alexa+ memahami konteks, mengingat preferensi Anda, dan belajar dari interaksi seiring waktu untuk menjadi asisten yang benar-benar personal.\"\n\nBerbeda dengan versi gratis asli, Alexa+ akan memerlukan biaya bulanan sebesar $19,99, mewakili pergeseran strategi penting untuk perangkat yang sebelumnya gratis. Namun, Amazon mengumumkan bahwa layanan ini akan tersedia tanpa biaya tambahan untuk anggota Amazon Prime, yang mungkin meningkatkan nilai proposisi langganan Premier mereka.\n\nVersi yang ditingkatkan ini mengintegrasikan teknologi AI generatif canggih yang dikembangkan oleh Amazon dan Anthropic, pemimpin dalam pengembangan AI yang bertanggung jawab. Kemitraan ini memungkinkan percakapan yang lebih alami dan pengalaman pengguna yang dipersonalisasi, dengan kemampuan untuk memahami dan mengingat konteks percakapan yang kompleks.\n\nDalam demonstrasi langsung, Alexa+ terlibat dalam dialog multi-putaran tentang perencanaan liburan, mengingat detail dari awal percakapan dan memberikan rekomendasi yang disesuaikan berdasarkan preferensi keluarga yang dinyatakan. Sistem ini juga menunjukkan kemampuan untuk mengontrol beberapa perangkat rumah pintar secara bersamaan melalui perintah suara tunggal yang kompleks.\n\nAlexa+ akan diluncurkan dengan akses awal di AS bulan depan pada perangkat Echo Show baru, dengan rencana untuk ekspansi internasional dan ke perangkat lain pada akhir tahun. Amazon menekankan bahwa pengguna masih dapat memilih untuk menggunakan Alexa versi asli pada model Echo yang lebih lama jika mereka memilih.\n\nAnalis industri melihat langkah ini sebagai upaya Amazon untuk meningkatkan keterlibatan pengguna dan profitabilitas perangkat mereka melalui model langganan, mengikuti strategi yang diterapkan oleh perusahaan teknologi lain. Langkah ini juga dilihat sebagai respons langsung terhadap masuknya asisten AI baru dari pesaing seperti Apple dan Google.",
    trending: true
  },
  {
    id: 5,
    title: "Bitcoin Turun di Bawah $90.000 Setelah Peretasan Bybit",
    date: "25 Februari 2025",
    summary: "Bitcoin jatuh di bawah $90.000, terendah sejak November, setelah peretasan Bybit senilai $1,5 miliar.",
    content: "Bitcoin turun di bawah $90.000, menyentuh level terendah sejak 18 November 2024, karena kombinasi kekhawatiran pasar terkait tarif AS dan dampak dari peretasan $1,5 miliar ether dari bursa Bybit minggu lalu. Penurunan ini menandai koreksi signifikan setelah crypto mencapai rekor tertinggi $124.500 pada awal bulan ini.\n\nBitcoin, mata uang kripto terbesar di dunia berdasarkan nilai pasar, terakhir turun 7,25% pada hari itu menjadi $87.169,76, memperpanjang penurunan mingguan menjadi lebih dari 18%. Sementara itu, Ethereum, cryptocurrency terbesar kedua, turun hampir 10% menjadi $3.890, level terendah dalam tiga bulan.\n\n\"Koreksi ini didorong oleh beberapa faktor, termasuk kekhawatiran tentang dampak peretasan Bybit terhadap ekosistem kripto yang lebih luas, serta sentimen risk-off yang lebih luas di pasar keuangan global,\" kata Sarah Chen, analis crypto di Bitfinex. \"Pemain besar mungkin menggunakan peretasan ini sebagai alasan untuk mengambil keuntungan setelah reli yang signifikan.\"\n\nPenarikan ini terjadi ketika investor global telah menjadi gelisah karena tanda-tanda 'exceptionalism' ekonomi AS mungkin memudar, yang diperburuk oleh insiden peretasan besar pada Bybit. Data ekonomi terakhir menunjukkan pendinginan di beberapa sektor, memicu kekhawatiran tentang pengetatan kebijakan moneter Federal Reserve.\n\nPara analis pasar tetap terbagi tentang apakah penurunan ini mewakili koreksi sementara atau awal tren bearish yang lebih lama. Beberapa menunjuk pada pengumuman terbaru dari perusahaan manajemen aset global tentang rencana untuk meningkatkan alokasi crypto mereka sebagai indikasi bahwa permintaan institusional tetap kuat.\n\n\"Kami melihat ini sebagai kesempatan pembelian bagi investor jangka panjang,\" kata Michael Harris, strategi kripto di VanEck. \"Fundamental yang mendasari tetap kuat, dengan adopsi institusional yang terus meningkat dan basis pengguna yang berkembang.\"",
    trending: true
  },
  {
    id: 6,
    title: "Bybit Mengambil Pinjaman dari Pesaing Setelah Peretasan Kripto Terbesar",
    date: "25 Februari 2025",
    summary: "Bybit menerima pinjaman dari bursa kripto lain untuk menutupi kerugian $1,4 miliar akibat peretasan.",
    content: "Bybit, salah satu bursa kripto terkemuka dengan basis lebih dari 60 juta pengguna, telah menerima pinjaman darurat dari beberapa bursa kripto pesaing untuk menutupi kerugian sekitar $1,4 miliar yang dicuri dalam peretasan besar-besaran minggu lalu. Insiden ini menjadi salah satu peretasan kripto terbesar sepanjang sejarah, hanya sedikit di bawah peretasan Poly Network senilai $1,7 miliar pada tahun 2023.\n\nCEO Bybit, Ben Zhou, mengonfirmasi situasi tersebut dalam sebuah pernyataan yang diposting di platform X: \"Kami telah mengamankan pinjaman sementara dari beberapa mitra industri terkemuka untuk memastikan bahwa semua permintaan penarikan pelanggan dapat terpenuhi.\" Zhou menekankan bahwa meskipun peretasan tersebut signifikan, Bybit tidak mengalami masalah solvabilitas, dan operasi sehari-hari tetap berjalan hampir tanpa gangguan.\n\n\"Fondasi keuangan kami tetap kuat,\" tambah Zhou. \"Kami sedang bekerja dengan otoritas penegak hukum dan firma keamanan siber untuk melacak dan potensial memulihkan aset yang dicuri.\"\n\nMenurut laporan keamanan internal yang terungkap, peretasan ini melibatkan pencurian aset kripto senilai $1,5 miliar dari 'dompet dingin' platform tersebut, yang seharusnya merupakan metode penyimpanan offline yang sangat aman. Para penyelidik menemukan bahwa peretas berhasil mengkompromikan kunci kriptografis yang mengendalikan dompet melalui serangan canggih yang menargetkan perangkat dan sistem manajemen kunci perusahaan.\n\nPakar keamanan siber dari firma Elliptic dan Chainalysis telah mengaitkan serangan tersebut dengan hacker yang disponsori oleh Korea Utara, khususnya kelompok yang dikenal sebagai Lazarus. Kelompok ini telah mencuri miliaran dolar dalam aset kripto dalam beberapa tahun terakhir, dengan American intelligence mengklaim bahwa dana tersebut digunakan untuk mendanai program senjata nuklir dan rudal balistik Korea Utara.\n\nSebagai respons terhadap peretasan tersebut, bursa kripto lain termasuk Binance dan Coinbase telah meningkatkan langkah-langkah keamanan mereka, dan beberapa telah memberlakukan pembekuan sementara pada transaksi yang melibatkan alamat yang dicurigai terkait dengan peretasan tersebut.\n\nInsiden ini telah memicu perdebatan yang lebih luas tentang keamanan di industri aset digital dan apakah pengaturan yang lebih ketat diperlukan. Regulator di beberapa yurisdiksi, termasuk SEC AS, telah menunjukkan bahwa mereka akan menggunakan peretasan ini sebagai kasus studi saat mengembangkan kerangka peraturan baru untuk pertukaran kripto.\n\n\"Ini adalah pengingat yang menyakitkan bahwa meskipun adopsi kripto tumbuh secara eksponensial, industri masih menghadapi tantangan keamanan yang signifikan,\" komentar Carol Alexander, Profesor Keuangan di University of Sussex. \"Tantangan terbesar bagi bursa adalah menyeimbangkan keamanan dengan kemudahan penggunaan dan aksesibilitas.\"",
    trending: false
  },
  {
    id: 7,
    title: "Pendapatan Generative AI Diperkirakan Mencapai $143 Miliar pada 2030",
    date: "24 Februari 2025",
    summary: "Pasar AI generatif diproyeksikan meningkat 12 kali lipat dalam lima tahun mendatang, mencapai $143 miliar.",
    content: "Pendapatan global dari aplikasi kecerdasan buatan generatif diperkirakan akan tumbuh 12 kali lipat dalam lima tahun ke depan, mencapai $143 miliar pada tahun 2030, menurut laporan komprehensif terbaru dari Goldman Sachs Research. Proyeksi ini meningkat tajam dari perkiraan sebelumnya sebesar $98 miliar yang dipublikasikan pada awal 2024.\n\nPeningkatan dramatis dalam forecast ini didorong oleh adopsi yang lebih cepat dari teknologi AI di berbagai sektor industri, terutama dalam layanan keuangan, kesehatan, dan manufaktur. Laporan tersebut mencatat bahwa implementasi AI generatif dalam tiga tahun terakhir telah melampaui bahkan perkiraan paling optimis dari analis industri.\n\n\"Kami melihat titik infleksi dalam adopsi AI generatif,\" tulis Jan Hatzius, Chief Economist Goldman Sachs dan salah satu penulis laporan tersebut. \"Peningkatan produktivitas yang terdokumentasi dengan baik dari implementasi awal, bersama dengan penurunan biaya komputasi, telah mempercepat kurva adopsi secara signifikan.\"\n\nLaporan tersebut memberikan analisis mendalam tentang dampak AI terhadap tenaga kerja global, menyatakan bahwa sampai 50% dari semua pekerjaan dapat terpengaruh oleh otomatisasi AI dalam beberapa cara. Dari jumlah tersebut, sekitar separuh diperkirakan akan mengalami penggantian tugas yang signifikan, sementara setengah lainnya akan melihat peningkatan produktivitas tanpa gangguan pekerjaan yang substansial.\n\n\"Ekonomi AI akan menciptakan jutaan pekerjaan baru, tetapi transisi akan memerlukan program pelatihan ulang yang signifikan,\" tambah laporan tersebut, memperkirakan bahwa investasi tahunan untuk pelatihan keterampilan terkait AI perlu mencapai $25 miliar secara global pada tahun 2027 untuk mengatasi kesenjangan keterampilan yang muncul.\n\nPertumbuhan pasar AI generatif ini diperkirakan akan dipimpin oleh Amerika Serikat dan Cina, dengan persaingan global yang semakin intens dalam pengembangan teknologi AI. Uni Eropa, Inggris, dan India juga diperkirakan akan menjadi pusat pengembangan AI yang signifikan, dengan kebijakan pemerintah yang semakin mendukung investasi dalam penelitian dan infrastruktur AI.\n\nPara analis Goldman Sachs juga menyoroti bahwa investasi dalam infrastruktur komputasi AI meningkat secara dramatis, dengan perkiraan pengeluaran global untuk pusat data AI mencapai $76 miliar pada tahun 2025, naik dari $30 miliar pada tahun 2023. Kekurangan dalam pasokan chip dan komponen pusat data lainnya tetap menjadi hambatan utama bagi pertumbuhan yang lebih cepat.\n\n\"Meskipun ada tantangan jangka pendek dalam rantai pasokan, kami tetap yakin bahwa infrastruktur akan berkembang untuk memenuhi permintaan,\" kata laporan tersebut. \"Investasi besar-besaran dalam kapasitas produksi chip dan konstruksi pusat data mengindikasikan bahwa industri sedang bersiap untuk pertumbuhan yang berkelanjutan.\"",
    trending: false
  },
  {
    id: 8,
    title: "Google Memperkenalkan Gemini Advanced 2.0 dengan Kemampuan Kode yang Ditingkatkan",
    date: "24 Februari 2025",
    summary: "Google meluncurkan Gemini Advanced 2.0 dengan fokus pada peningkatan kapabilitas pemrograman dan analisis data.",
    content: "Google telah meluncurkan Gemini Advanced 2.0, versi terbaru dari model AI unggulannya, dengan peningkatan signifikan dalam pemrograman dan kapabilitas analisis data.\n\nPembaruan ini menargetkan pengguna teknis dan pengembang dengan fungsi yang ditingkatkan untuk analisis kode kompleks, debugging, dan refactoring di berbagai bahasa pemrograman. Versi baru ini juga menawarkan integrasi yang lebih baik dengan lingkungan pengembangan seperti GitHub dan popularitas IDE, serta memperkenalkan kemampuan untuk mengeksekusi dan menguji kode secara langsung di dalam platform. Benchmark internal Google menunjukkan bahwa Gemini Advanced 2.0 melampaui model AI lain dalam tugas-tugas teknis seperti pemecahan masalah pemrograman dan rekayasa perangkat lunak.\n\nPembaruan ini terutama menargetkan segmen pengguna bisnis dan profesional, yang semakin penting untuk strategi monetisasi AI Google. Meskipun layanan ini tetap pada tingkat harga $20 per bulan, Google telah memperkenalkan paket tim baru yang menawarkan fitur tambahan dan alat kolaborasi untuk organisasi.",
    trending: false
  },
  {
    id: 9,
    title: "Perusahaan Rintisan AI Medis Mendapatkan Pendanaan Seri B Senilai $120 Juta",
    date: "23 Februari 2025",
    summary: "BioMindAI mengamankan pendanaan Seri B untuk mengembangkan platform diagnostik medis bertenaga AI mereka.",
    content: "BioMindAI, sebuah perusahaan rintisan AI medis yang berfokus pada diagnosis dini dan penanganan penyakit, telah mengamankan pendanaan Seri B senilai $120 juta dalam putaran pendanaan yang sangat dinantikan yang dipimpin oleh Sequoia Capital dan Andreessen Horowitz, dengan partisipasi dari beberapa investor terkemuka lainnya di sektor healthtech.\n\nDidirikan pada tahun 2021 oleh sekelompok peneliti medis dan pakar AI dari Stanford dan MIT, perusahaan ini telah dengan cepat mendapatkan perhatian di industri kesehatan karena pendekatan inovatifnya dalam memanfaatkan kecerdasan buatan untuk meningkatkan hasil pasien.\n\nPerusahaan ini mengembangkan platform AI canggih yang dapat menganalisis beragam data medis pasien, termasuk hasil tes laboratorium, pencitraan diagnostik, rekam medis elektronik, dan bahkan data genomik, untuk membantu dokter dalam membuat diagnosis yang lebih akurat dan rencana perawatan yang dipersonalisasi. Algoritma pembelajaran mesin platform ini dilatih pada dataset anonim dari lebih dari 10 juta catatan pasien, memungkinkannya untuk mengidentifikasi pola dan korelasi yang mungkin terlewatkan oleh praktisi manusia.\n\n\"Apa yang membedakan BioMindAI adalah kemampuannya untuk mengintegrasikan dan menganalisis berbagai jenis data medis secara bersamaan,\" kata Dr. Michael Patel, seorang dokter di Mayo Clinic yang telah menguji platform tersebut. \"Ini seperti memiliki konsultan multidisiplin yang telah meninjau ribuan kasus serupa.\"\n\nPlatform BioMindAI telah menunjukkan hasil awal yang sangat menjanjikan dalam meningkatkan diagnosis dini untuk beberapa kondisi, termasuk kanker paru-paru, diabetes, dan penyakit kardiovaskular. Dalam uji klinis awal di lima rumah sakit pengajaran, sistem tersebut mendeteksi tanda-tanda awal kanker paru-paru pada citra CT hingga 18 bulan sebelum diagnosis manusia dalam 26% kasus, berpotensi meningkatkan hasil pengobatan secara dramatis.\n\nDengan pendanaan baru ini, perusahaan berencana untuk memperluas uji klinis mereka ke lebih banyak institusi medis, mempercepat pengembangan algoritma mereka untuk penyakit dan kondisi tambahan, dan mempersiapkan peluncuran platform mereka ke pasar yang lebih luas. Pendanaan tersebut juga akan digunakan untuk membangun tim penjualan dan pemasaran, serta memperkuat kerangka kerja kepatuhan regulasi perusahaan.\n\n\"Misi kami adalah untuk demokratisasi akses ke alat diagnostik canggih dan meningkatkan hasil kesehatan di seluruh dunia dengan memanfaatkan kekuatan AI,\" kata CEO BioMindAI, Dr. Sarah Chen, dalam konferensi pers pengumuman pendanaan. \"Dana ini akan memungkinkan kami untuk mempercepat pengembangan dan penerapan platform kami, serta memperluas ke pasar internasional yang memiliki kebutuhan mendesak untuk solusi diagnostik yang terjangkau dan akurat.\"\n\nPara pemimpin industri dan investor memandang putaran pendanaan ini—salah satu yang terbesar untuk startup kesehatan AI tahun ini—sebagai bukti potensi pertumbuhan yang signifikan dalam sektor kesehatan AI. Analis pasar memperkirakan bahwa pasar global untuk aplikasi AI dalam diagnostik medis akan mencapai $67 miliar pada tahun 2028.\n\n\"BioMindAI mewakili perpaduan sempurna antara keahlian medis yang mendalam dan teknologi AI canggih,\" kata Sarah Guo, mitra di Greylock Partners, salah satu investor di putaran tersebut. \"Platform mereka memiliki potensi untuk secara fundamental mengubah proses diagnostik medis dan, pada akhirnya, menyelamatkan nyawa.\"",
    trending: false
  },
  {
    id: 10,
    title: "Meta AI Meluncurkan Asisten Kreatif AI untuk Pembuat Konten",
    date: "22 Februari 2025",
    summary: "Meta memperkenalkan Spark, asisten AI yang dirancang khusus untuk pembuat konten visual di platform mereka.",
    content: "Meta telah meluncurkan Spark, asisten AI baru yang dirancang khusus untuk pembuat konten visual di seluruh platform mereka, termasuk Instagram, Facebook, dan Threads. Pengumuman ini dibuat oleh Mark Zuckerberg di acara Meta Creator Conference yang diadakan di Los Angeles, di mana platform ini didemonstrasikan langsung di hadapan ratusan kreator terkemuka.\n\n\"Spark adalah asisten kreator pertama yang benar-benar memahami tren visual dan dinamika keterlibatan di berbagai platform sosial,\" kata Zuckerberg selama presentasi. \"Ini seperti memiliki tim kreatif profesional dan analis data dalam satu paket.\"\n\nAlat inovatif ini memadukan kemampuan generasi gambar dan video canggih dengan rekomendasi konten yang dipersonalisasi, memberikan kreator rangkaian alat yang komprehensif untuk membantu mereka mengoptimalkan strategi konten mereka. Integrasi mulus dengan platform Meta yang ada memungkinkan kreator untuk merancang, mengedit, dan menjadwalkan konten tanpa perlu beralih antara berbagai aplikasi dan layanan.\n\nDalam demonya, Spark mengesankan audiens dengan kemampuannya untuk menghasilkan variasi konten dengan cepat, mengedit aset visual dengan instruksi bahasa alami sederhana, dan menyarankan waktu posting optimal berdasarkan data keterlibatan pengguna yang tersegmentasi dengan baik berdasarkan demografi dan zona waktu.\n\nFitur-fitur utamanya, yang dikembangkan berdasarkan penelitian ekstensif dengan ribuan kreator, termasuk:\n\n• Vision-to-Creation: Kemampuan untuk menerjemahkan deskripsi teks menjadi konsep visual yang siap untuk platform tertentu, dengan mempertimbangkan tren terkini dan estetika unik kreator.\n\n• Variasi Konten: Menghasilkan beberapa variasi dari satu aset konten, memungkinkan kreator untuk menguji berbagai pendekatan visual dan caption untuk memaksimalkan keterlibatan.\n\n• Rekomendasi Performa: Memprediksi metrik keterlibatan untuk setiap variasi konten berdasarkan data historis dari konten serupa, membantu kreator membuat keputusan yang lebih terinformasi.\n\n• Kalendar Konten: Alat perencanaan terintegrasi yang membantu kreator mengembangkan dan mempertahankan jadwal posting yang konsisten di seluruh platform.\n\n• Asisten Pengeditan Real-time: Kemampuan untuk memberikan saran dan perbaikan langsung saat kreator sedang mengedit gambar atau video.\n\nMeta menekankan bahwa Spark telah dilatih dengan fokus khusus pada keragaman representasi dan menghormati hak cipta kreator, dengan perusahaan berinvestasi secara signifikan dalam perlindungan terhadap bias dan memastikan bahwa gambar yang dihasilkan dapat dengan jelas dibedakan dari konten buatan manusia.\n\n\"Spark dirancang untuk melengkapi kreativitas manusia, bukan menggantikannya,\" kata Ashley Chang, VP of Creator Experiences di Meta. \"Ini tentang menghilangkan tugas-tugas yang membosankan dan repetitif, sehingga kreator dapat fokus pada aspek-aspek yang benar-benar kreatif dari pekerjaan mereka.\"\n\nPeluncuran ini sejalan dengan strategi Meta yang lebih luas untuk mengintegrasikan alat AI generatif di seluruh platform mereka, dengan tujuan mengembangkan ekosistem kreator mereka dan meningkatkan keterlibatan pengguna dalam pertarungan yang semakin meningkat dengan TikTok dan platform lain yang merebut waktu dan perhatian pengguna.\n\nAlat ini akan tersedia untuk kreator dengan minimal 10.000 pengikut di salah satu platform Meta, dengan peluncuran bertahap selama beberapa bulan ke depan. Meta juga mengumumkan rencana untuk akhirnya menawarkan fitur-fitur Spark tertentu kepada basis pengguna yang lebih luas, dengan kemampuan dasar yang akan tersedia bagi semua pengguna platform pada tahun 2026.\n\nAnalis industri telah memuji langkah tersebut, dengan beberapa menyatakannya sebagai salah satu integrasi AI yang paling praktis dan user-friendly yang telah dilihat di platform media sosial utama. \"Meta sedang memposisikan dirinya di depan kurva dalam hal memberikan nilai AI yang praktis kepada kreator,\" kata Casey Newton, analis teknologi. \"Ini adalah contoh bagus dari AI yang meningkatkan, bukan menggantikan, kemampuan manusia.\"",
    trending: false
  },
  {
    id: 11,
    title: "Laporan: Setengah dari Perusahaan Fortune 500 Menggunakan AI Generatif secara Aktif",
    date: "21 Februari 2025",
    summary: "Survei terbaru mengungkapkan adopsi AI generatif yang cepat di antara perusahaan Fortune 500, dengan fokus pada efisiensi operasional.",
    content: "Sebuah laporan komprehensif terbaru dari McKinsey & Company mengungkapkan bahwa lebih dari separuh perusahaan Fortune 500 sekarang menggunakan aplikasi AI generatif secara aktif dalam operasi mereka, menandai poin infleksi penting dalam adopsi teknologi transformatif ini.\n\nSurvei tahunan yang mencakup 300 eksekutif C-level di perusahaan Fortune 500 ini menemukan bahwa 53% perusahaan terkemuka telah mengimplementasikan solusi AI generatif di setidaknya satu departemen atau fungsi bisnis, meningkat secara dramatis dari hanya 28% pada tahun sebelumnya. Peningkatan 25 poin persentase ini mewakili salah satu adopsi teknologi paling cepat yang pernah dicatat oleh firma konsultan tersebut.\n\n\"Apa yang kami saksikan adalah transformasi mendasar dalam cara perusahaan beroperasi,\" kata Dr. Michael Chui, partner di McKinsey Global Institute dan penulis utama laporan tersebut. \"AI generatif tidak lagi menjadi eksperimen di lab inovasi—ini telah bergerak menjadi alat produktivitas mainstream di banyak organisasi terkemuka.\"\n\nDepartemen yang paling sering mengadopsi teknologi ini adalah pemasaran dan layanan pelanggan, dengan 72% perusahaan yang disurvei melaporkan implementasi AI generatif dalam fungsi-fungsi ini. Kasus penggunaan umum termasuk pengembangan konten pemasaran yang dipersonalisasi secara massal, analisis sentimen pelanggan real-time, dan chatbot tingkat lanjut. Fungsi-fungsi berikutnya yang paling umum adalah pengembangan produk (64%) dan TI (59%), di mana AI generatif digunakan untuk segala hal mulai dari pembuatan kode dan debugging hingga desain produk dan pemodelan simulasi.\n\nHasil yang dilaporkan dari implementasi ini secara konsisten kuat. Perusahaan melaporkan peningkatan produktivitas rata-rata sebesar 22% di area di mana AI generatif diimplementasikan, dengan beberapa perusahaan melaporkan peningkatan hingga 40% untuk fungsi tertentu. Selain itu, 38% responden melaporkan penghematan biaya yang signifikan, dengan ROI tiga tahun rata-rata sekitar 4,4 kali investasi awal.\n\nSalah satu contoh yang menonjol adalah perusahaan farmasi besar yang menggunakan AI generatif untuk mempercepat fase penemuan obat, memangkas hingga 18 bulan dari timeline pengembangan obat tradisional. Di sektor keuangan, bank investasi terkemuka melaporkan peningkatan produktivitas 35% di tim analisis penelitian mereka, memungkinkan analis untuk menutupi lebih banyak perusahaan dan menghasilkan wawasan yang lebih dalam.\n\nMeskipun demikian, laporan tersebut mengidentifikasi beberapa tantangan yang sedang berlangsung dalam implementasi AI generatif skala besar. Kekhawatiran paling atas yang dilaporkan oleh eksekutif meliputi:\n\n• Keamanan data dan privasi (dilaporkan oleh 78% responden)\n• Kepatuhan regulasi dalam lingkungan yang semakin diatur (64%)\n• Kebutuhan untuk meningkatkan keterampilan tenaga kerja yang ada (61%)\n• Mengelola perubahan organisasi dan resistensi (52%)\n• Integrasi dengan sistem warisan (47%)\n\n\"Hambatan terbesar untuk adopsi bukanlah teknologi itu sendiri, tetapi kemampuan organisasi untuk beradaptasi dan berkembang bersamanya,\" kata Kate Smaje, Senior Partner dan Global Leader di McKinsey Digital. \"Perusahaan yang berinvestasi dalam pelatihan, mendefinisikan kembali proses, dan mengelola perubahan dengan cermat melihat hasil yang jauh lebih baik.\"\n\nMelihat ke depan, investasi dalam AI generatif akan terus meningkat secara signifikan. Sebanyak 67% eksekutif yang disurvei berencana untuk meningkatkan anggaran mereka untuk teknologi AI generatif dalam 12 bulan ke depan, dengan rata-rata peningkatan yang direncanakan sebesar 35%. Fokus utama untuk investasi masa depan termasuk integrasi yang lebih baik dengan sistem yang ada, ekspansi ke fungsi bisnis tambahan, dan pengembangan kasus penggunaan yang lebih khusus untuk industri.\n\nPara analis McKinsey mencatat bahwa pasar telah beralih melampaui apa yang mereka sebut sebagai \"fase hype\" awal AI generatif dan sekarang memasuki periode implementasi praktis yang menghasilkan hasil bisnis yang terukur. Mereka memperkirakan bahwa pasar solusi AI generatif perusahaan akan tumbuh dari sekitar $20 miliar pada 2024 menjadi lebih dari $120 miliar pada 2028.\n\n\"Kami melihat banyak perusahaan beralih dari bertanya 'apakah kita harus mengadopsi AI generatif' menjadi 'bagaimana kita dapat menggunakan AI generatif untuk mengubah bisnis kita',\" kata laporan tersebut. \"Ini adalah pergeseran mendasar dalam sikap yang kemungkinan akan mempercepat dampak transformasional teknologi ini.\"",
    trending: false
  },
  {
    id: 12,
    title: "Startup AI Open-Source Menentang Model Kepemilikan dengan Dataset Gratis 2 Triliun Token",
    date: "20 Februari 2025",
    summary: "OpenInference merilis dataset pelatihan AI terbuka berukuran 2 triliun token, menantang pendekatan kepemilikan di industri.",
    content: "OpenInference, sebuah startup AI yang berfokus pada penelitian open-source, telah menggemparkan industri dengan merilis dataset pelatihan AI kolosal berukuran 2 triliun token yang tersedia secara gratis untuk komunitas penelitian dan pengembangan global. Langkah berani ini dipandang sebagai tantangan langsung terhadap model bisnis kepemilikan yang saat ini mendominasi lanskap AI dan didukung oleh pemain besar industri seperti OpenAI, Anthropic, dan Google.\n\n\"Kami percaya bahwa kemajuan AI seharusnya tidak dikontrol oleh segelintir perusahaan dengan sumber daya luar biasa,\" kata Dr. Elena Petrova, CEO dan salah satu pendiri OpenInference, dalam pengumuman peluncuran. \"OpenCorpus mewakili langkah signifikan menuju ekosistem AI yang lebih terbuka, inklusif, dan kolaboratif.\"\n\nDataset masif ini, yang diberi nama 'OpenCorpus', mencakup teks terstruktur dan tidak terstruktur dalam 30 bahasa yang dengan hati-hati dikurasi dari berbagai sumber internet yang tersedia secara publik. Tidak seperti beberapa dataset pelatihan besar lainnya, OpenCorpus memiliki fokus khusus pada konten berkualitas tinggi, dengan lebih dari 60% datanya berasal dari materi pendidikan, literatur akademik, dokumentasi teknis, dan publikasi ilmiah peer-reviewed.\n\nOpenInference sangat menekankan bahwa dataset telah melalui proses penyaringan dan pembersihan yang ketat, menggunakan kombinasi alat otomatis dan pengawasan manusia untuk menghapus informasi pribadi yang dapat diidentifikasi, konten yang berpotensi berbahaya, dan materi yang dilindungi hak cipta. Perusahaan juga telah menerbitkan dokumentasi komprehensif tentang metodologi pengumpulan dan pemfilteran data mereka, memberikan tingkat transparansi yang tidak biasa dibandingkan dengan dataset kepemilikan.\n\n\"Mengetahui apa yang ada dalam data pelatihan Anda sama pentingnya dengan algoritma itu sendiri,\" jelas Dr. James Chen, Chief Data Officer OpenInference. \"Kami telah membuat upaya besar-besaran untuk mendokumentasikan sumber, distribusi, dan karakteristik OpenCorpus, memungkinkan peneliti untuk lebih memahami dan mengatasi potensi bias atau keterbatasan.\"\n\nBersamaan dengan dataset tersebut, tim teknisi yang dipimpin oleh sekelompok mantan peneliti dari DeepMind, OpenAI, dan Stanford AI Lab, telah mengembangkan dan merilis suite alat open-source yang komprehensif. Alat-alat ini dirancang untuk membantu peneliti dan pengembang memproses, memanfaatkan, dan membangun di atas dataset ini secara efektif, termasuk framework preprocessing, arsitektur model referensi, dan utilitas evaluasi.\n\nPendekatan open-source radikal ini bertujuan untuk secara fundamental mendemokratisasi akses ke teknologi AI dengan secara drastis menurunkan hambatan masuk bagi peneliti independen, akademisi, dan startup yang mungkin tidak memiliki sumber daya komputasi atau keuangan untuk mengumpulkan dan membersihkan dataset pelatihan berskala besar sendiri.\n\n\"Hingga saat ini, membangun model bahasa besar yang kompetitif memerlukan infrastruktur data dan komputasi yang sangat mahal,\" kata Professor Emily Wong dari MIT, yang tidak berafiliasi dengan proyek tersebut. \"OpenCorpus berpotensi menjadi game-changer bagi lab-lab yang lebih kecil dan startup yang ingin berkompetisi atau bereksperimen dengan AI generatif.\"\n\nTidak mengherankan, rilis ini telah menjadi isu kontroversial dalam komunitas AI. Sementara beberapa kritikus mempertanyakan potensi risiko dari pendekatan terbuka semacam itu, dengan mengutip kekhawatiran tentang penyalahgunaan atau pengembangan model berbahaya, pendukung berargumen bahwa transparansi yang lebih besar dan kolaborasi yang lebih luas justru diperlukan untuk memastikan bahwa teknologi AI berkembang dengan cara yang menguntungkan masyarakat secara luas.\n\n\"Demokratisasi AI bukanlah ancaman—itu adalah prasyarat untuk AI yang bertanggung jawab,\" kata Dr. Petrova. \"Ketika lebih banyak suara dan perspektif dilibatkan dalam pengembangan sistem ini, kita memiliki kesempatan yang lebih baik untuk memastikan bahwa mereka mewakili dan melayani kebutuhan manusia secara luas.\"\n\nOpenInference, yang berbasis di Zurich, Swiss, didukung oleh kombinasi pendanaan ventura dari Sequoia Capital dan Mozilla Ventures, serta donasi substantif dari beberapa organisasi nirlaba yang berfokus pada pengembangan AI etis dan bertanggung jawab, termasuk AI Safety Foundation dan Digital Rights Initiative.",
    trending: false
  }
];

// Main App Component
const App = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setIsScrolling(true);
      
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
      
      return () => clearTimeout(timeout);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(loadingTimer);
    };
  }, []);
  
  const openNewsReader = (news) => {
    setSelectedNews(news);
    document.body.style.overflow = 'hidden';
  };
  
  const closeNewsReader = () => {
    setSelectedNews(null);
    document.body.style.overflow = 'auto';
  };
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header scrollPosition={scrollPosition} isScrolling={isScrolling} />
      
      <main className="container mx-auto px-4 py-20">
        {selectedNews ? (
          <NewsReader news={selectedNews} onClose={closeNewsReader} />
        ) : (
          <>
            <HeroSection />
            <WebsitePurpose />
            <TrendingNews news={aiNewsData.filter(item => item.trending)} onSelectNews={openNewsReader} />
            <LatestNews news={aiNewsData} onSelectNews={openNewsReader} />
            <StandardNews news={aiNewsData.filter(item => !item.trending)} onSelectNews={openNewsReader} />
            <SubscribeSection />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="relative w-40 h-40">
            {/* Animated circles */}
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"></div>
            <div className="absolute inset-2 rounded-full border-4 border-blue-400 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full border-4 border-blue-300 animate-spin"></div>
            <div className="absolute inset-6 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-bold text-blue-400">N</div>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-blue-400">
          <span className="inline-block animate-bounce delay-100">N</span>
          <span className="inline-block animate-bounce delay-200">e</span>
          <span className="inline-block animate-bounce delay-300">w</span>
          <span className="inline-block animate-bounce delay-400">s</span>
          <span className="inline-block animate-bounce delay-500">A</span>
          <span className="inline-block animate-bounce delay-600">i</span>
          <span className="inline-block animate-bounce delay-700">P</span>
          <span className="inline-block animate-bounce delay-800">e</span>
          <span className="inline-block animate-bounce delay-900">t</span>
        </h1>
        
        <div className="text-xl text-gray-400 mb-8">
          Loading{dots}
        </div>
        
        <div className="text-sm text-gray-500 animate-pulse">by pet</div>
      </div>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          NewsAiPet
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">Your premier source for the latest AI breakthroughs and developments</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Latest News
          </button>
          <button className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            AI Topics
          </button>
        </div>
      </div>
      
      <div className="relative h-16 overflow-hidden">
        <div className="absolute left-0 right-0 h-32 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 opacity-20 transform -rotate-3"></div>
      </div>
    </section>
  );
};

// Website Purpose Section
const WebsitePurpose = () => {
  return (
    <section className="py-16 bg-gray-800 rounded-xl mb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 relative inline-block">
            What is NewsAiPet?
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </h2>
          
          <p className="text-lg mb-6 text-gray-300">
            NewsAiPet is your dedicated portal for staying informed about the rapidly evolving world of artificial intelligence. We curate the most significant AI breakthroughs, policies, applications, and discussions happening globally.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-700 p-6 rounded-lg transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Latest Updates</h3>
              <p className="text-gray-300">Stay informed with daily updates on groundbreaking AI research and technology developments.</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Analysis</h3>
              <p className="text-gray-300">Get deeper insights with our expert commentary on implications of AI advancements.</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg transform transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Focused Reading</h3>
              <p className="text-gray-300">Enjoy distraction-free reading experience designed for maximum comprehension.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trending News Section Component with Horizontal Scroll
const TrendingNews = ({ news, onSelectNews }) => {
  const scrollRef = React.useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth * 0.8 : current.offsetWidth * 0.8;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const handleScroll = () => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      setShowLeftArrow(current.scrollLeft > 30);
      setShowRightArrow(current.scrollLeft < current.scrollWidth - current.offsetWidth - 30);
    }
  };
  
  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      current.addEventListener('scroll', handleScroll);
      return () => current.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold relative inline-block">
          Trending Now
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
        </h2>
        
        <div className="flex space-x-2">
          <button 
            className={`p-2 rounded-full bg-gray-800 transition-all duration-300 ${showLeftArrow ? 'opacity-100 hover:bg-gray-700' : 'opacity-40 cursor-not-allowed'}`}
            onClick={() => scroll('left')}
            disabled={!showLeftArrow}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className={`p-2 rounded-full bg-gray-800 transition-all duration-300 ${showRightArrow ? 'opacity-100 hover:bg-gray-700' : 'opacity-40 cursor-not-allowed'}`}
            onClick={() => scroll('right')}
            disabled={!showRightArrow}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-6 hide-scrollbar snap-x scroll-px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {news.map((item, index) => (
          <div 
            key={item.id}
            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-3 snap-start"
          >
            <div 
              className="bg-gray-800 rounded-lg p-6 cursor-pointer transform transition-all duration-500 ease-out border-l-4 border-red-500 h-full hover:bg-gray-750 hover:shadow-xl hover:shadow-red-900/10"
              onClick={() => onSelectNews(item)}
            >
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-red-400 text-sm font-semibold">Trending</span>
              </div>
              
              <div className="mb-2 text-gray-400 text-sm">{item.date}</div>
              <h3 className="text-xl font-bold mb-3 hover:text-red-400 transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-300 line-clamp-3">{item.summary}</p>
              
              <div className="mt-4 text-red-400 flex items-center hover:translate-x-2 transition-all duration-300">
                <span>Read full story</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Latest News Section
const LatestNews = ({ news, onSelectNews }) => {
  const featuredNews = news[0]; // First news is featured
  const otherNews = news.slice(1); // Semua berita setelah featured

  return (
    <section className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 relative inline-block">
        Latest in AI
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-500 ease-out hover:shadow-xl hover:shadow-blue-900/10 h-full"
            onClick={() => onSelectNews(featuredNews)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-6 bg-blue-500 mr-4"></div>
                <span className="text-lg font-semibold text-blue-400">Featured Story</span>
              </div>

              <div className="mb-2 text-gray-400 text-sm">{featuredNews.date}</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 hover:text-blue-400 transition-colors duration-300">
                {featuredNews.title}
              </h3>
              <p className="text-gray-300 text-lg mb-4">{featuredNews.summary}</p>

              <div className="mt-4 text-blue-400 flex items-center hover:translate-x-2 transition-all duration-300">
                <span>Read full story</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid fleksibel untuk semua berita lain */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherNews.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-4 cursor-pointer transform transition-all duration-300 ease-out hover:shadow-md hover:bg-gray-750"
              onClick={() => onSelectNews(item)}
            >
              <div className="mb-1 text-gray-400 text-xs">{item.date}</div>
              <h3 className="text-md font-bold mb-2 hover:text-blue-400 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm line-clamp-2">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Standard News Component
const StandardNews = ({ news, onSelectNews }) => {
  return (
    <section className="mb-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 relative inline-block">
        More AI News
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <NewsCard 
            key={item.id} 
            news={item} 
            onClick={() => onSelectNews(item)} 
          />
        ))}
      </div>
    </section>
  );
};

// Subscribe Section
const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }, 1500);
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-20">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Stay Updated with AI Developments</h2>
        <p className="text-gray-300 mb-8">Subscribe to our newsletter to get the latest AI news and updates delivered to your inbox</p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
          <input 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={handleEmailChange}
            disabled={subscribed || loading}
            className={`flex-grow px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${subscribed ? 'opacity-50' : ''}`}
          />
          
          {!subscribed ? (
            <button 
              onClick={handleSubscribe}
              disabled={loading || !email || !email.includes('@')}
              className={`relative overflow-hidden px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? 'cursor-wait' : (!email || !email.includes('@')) ? 'opacity-70 cursor-not-allowed' : 'group'}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                <>
                  <span>Subscribe</span>
                  <span className="absolute inset-0 h-full w-0 bg-white bg-opacity-20 transition-all duration-300 group-hover:w-full"></span>
                </>
              )}
            </button>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-green-600 rounded-lg animate-fadeIn p-3">
              <svg className="w-6 h-6 text-white mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-white font-medium">Successfully subscribed to latest updates!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Header Component
const Header = ({ scrollPosition, isScrolling }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${scrollPosition > 50 ? 'bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}
    ${isScrolling ? 'transform -translate-y-1' : 'transform translate-y-0'}`;
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-blue-400">News</span>
            <span className="text-gray-200">Ai</span>
            <span className="text-purple-400">Pet</span>
          </h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                Latest
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                Trending
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                Topics
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 invisible'} overflow-hidden`}>
        <nav className="px-4 pt-2 pb-4 bg-gray-800 bg-opacity-95 backdrop-blur-md">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200">Latest</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200">Trending</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200">Topics</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded-md transition-colors duration-200">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// News Card Component
const NewsCard = ({ news, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  return (
    <div 
      className={`bg-gray-800 rounded-lg p-6 cursor-pointer transform transition-all duration-500 ease-out
        ${isHovered ? 'scale-105 shadow-xl bg-gray-750' : 'scale-100 shadow-md'}
        hover:shadow-blue-900/20 hover:shadow-lg`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden mb-4">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out ${isHovered ? 'w-full' : 'w-2/3'}`}></div>
      </div>
      
      <div className="mb-2 text-gray-400 text-sm">{news.date}</div>
      <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${isHovered ? 'text-blue-400' : 'text-white'}`}>{news.title}</h3>
      <p className="text-gray-300 line-clamp-3">{news.summary}</p>
      
      <div className={`mt-4 text-blue-400 flex items-center transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-70 -translate-x-2'}`}>
        <span>Read more</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

// News Reader Component
const NewsReader = ({ news, onClose }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareAction, setShareAction] = useState(null);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const [previewPlatform, setPreviewPlatform] = useState(null);
  const linkRef = useRef(null);

  useEffect(() => {
    // Simulate content loading
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 1800);
    
    const shareTimer = setTimeout(() => {
      setShowShare(true);
    }, 3000);
    
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(shareTimer);
    };
  }, []);
  
  const handleScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const percentage = (scrollTop / scrollHeight) * 100;
    
    setScrollPercentage(percentage);
    setScrolled(scrollTop > 20);
  };

  const handleShare = (platform) => {
    // Set share action to trigger animation
    setShareAction(platform);
    
    // Generate share URL based on platform
    let shareUrl = window.location.href;
    if (!shareUrl.includes('?article=')) {
      shareUrl = `${shareUrl}?article=${news.id}`;
    }
    
    const title = news.title;
    const text = `Check out this article: ${title}`;
    
    let url = '';
    
    switch(platform) {
      case 'x':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct link sharing through URL
        // Usually redirects to Instagram app or website
        setPreviewPlatform('instagram');
        setShowSharePreview(true);
        setTimeout(() => {
          setShareAction(null);
          setShowSharePreview(false);
        }, 3000);
        return;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          // Reset after 2 seconds
          setTimeout(() => {
            setShareAction(null);
          }, 2000);
        });
        return;
      default:
        break;
    }
    
    // Open share URL in new window
    if (url) {
      window.open(url, '_blank');
      setPreviewPlatform(platform);
      setShowSharePreview(true);
    }
    
    // Reset after 2 seconds
    setTimeout(() => {
      setShareAction(null);
      setTimeout(() => {
        setShowSharePreview(false);
      }, 1000);
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <div className={`sticky top-0 p-4 flex justify-between items-center transition-all duration-300 z-10 ${scrolled ? 'bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-md' : ''}`}>
        <h3 className="font-bold text-xl truncate pr-4">{news.title}</h3>
        <button 
          onClick={onClose}
          className="rounded-full p-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 focus:outline-none transform hover:rotate-90 hover:scale-110 duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="overflow-y-auto flex-1 p-4 md:p-8" onScroll={handleScroll}>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-blue-400 border-t-transparent animate-spin animation-delay-150"></div>
              <div className="absolute inset-4 rounded-full border-4 border-blue-300 border-t-transparent animate-spin animation-delay-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-blue-400 text-sm font-semibold">Loading</div>
              </div>
            </div>
            <div className="text-blue-400 text-lg animate-pulse">Preparing your article...</div>
          </div>
        ) : (
          <div className={`max-w-3xl mx-auto transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-blue-400 mb-2 animate-fadeIn">{news.date}</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 animate-fadeIn animation-delay-150">{news.title}</h2>
            
            <div className="prose prose-lg prose-invert max-w-none">
              {news.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className={`mb-4 animate-fadeIn`} style={{ animationDelay: `${150 + (index * 100)}ms` }}>{paragraph}</p>
              ))}
            </div>
            
            {/* Share Section with Preview */}
            <div className={`mt-12 pt-6 border-t border-gray-700 transition-all duration-700 ${showShare ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex flex-col space-y-4 py-4">
                {/* SharePreview */}
                {showSharePreview && (
                  <div className="bg-gray-750 p-4 rounded-lg mb-4 animate-fadeIn">
                    <div className="flex items-center mb-3">
                      {previewPlatform === 'x' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      )}
                      {previewPlatform === 'facebook' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                      )}
                      {previewPlatform === 'whatsapp' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                      )}
                      {previewPlatform === 'instagram' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                          <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                        </svg>
                      )}
                      <span className="text-gray-300 font-medium">Share Preview</span>
                    </div>
                    <div className="flex bg-gray-700 rounded-lg p-3">
                      <div className="mr-3 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-2xl font-bold text-white">N</div>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-sm mb-1">NewsAiPet</h5>
                        <p className="text-gray-300 text-xs line-clamp-2">{news.title}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* "by NewsAiPet" with Share buttons */}
                <div className="flex flex-wrap items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="flex items-center animate-pulse">
                      <div className="w-5 h-5 bg-blue-500 rounded-full mr-1"></div>
                      <span className="font-bold text-sm">by</span>
                    </div>
                    
                    <div className="relative mx-2">
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x text-lg">
                        NewsAiPet
                      </span>
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x"></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {/* X (Twitter) */}
                    <button 
                      onClick={() => handleShare('x')}
                      className={`relative p-2 rounded-full ${shareAction === 'x' ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'} transition-all duration-300 transform hover:scale-110`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      {shareAction === 'x' && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 animate-ping">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                        </span>
                      )}
                    </button>
                    
                    {/* Facebook */}
                    <button 
                      onClick={() => handleShare('facebook')}
                      className={`relative p-2 rounded-full ${shareAction === 'facebook' ? 'bg-blue-800' : 'bg-blue-700 hover:bg-blue-800'} transition-all duration-300 transform hover:scale-110`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                      {shareAction === 'facebook' && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 animate-ping">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                        </span>
                      )}
                    </button>
                    
                    {/* WhatsApp */}
                    <button 
                      onClick={() => handleShare('whatsapp')}
                      className={`relative p-2 rounded-full ${shareAction === 'whatsapp' ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'} transition-all duration-300 transform hover:scale-110`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      {shareAction === 'whatsapp' && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 animate-ping">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                        </span>
                      )}
                    </button>
                    
                    {/* Instagram */}
                    <button 
                      onClick={() => handleShare('instagram')}
                      className={`relative p-2 rounded-full ${shareAction === 'instagram' ? 'bg-pink-700' : 'bg-gradient-to-br from-pink-500 via-purple-600 to-orange-500 hover:from-pink-600 hover:via-purple-700 hover:to-orange-600'} transition-all duration-300 transform hover:scale-110`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      {shareAction === 'instagram' && (
                        <span className="absolute -top-2 -right-2 flex h-4 w-4 animate-ping">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                        </span>
                      )}
                    </button>
                    
                    {/* Copy Link */}
                    <button 
                      onClick={() => handleShare('copy')}
                      className={`relative p-2 rounded-full ${shareAction === 'copy' ? 'bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'} transition-all duration-300 transform hover:scale-110`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {shareAction === 'copy' && (
                        <div className="absolute -top-8 -right-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-md animate-fadeIn">
                          Copied!
                          <div className="absolute -bottom-1 right-3 w-2 h-2 bg-green-500 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="h-1 bg-gray-800 w-full">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareAction, setShareAction] = useState(null);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }, 1500);
  };
  
  const handleSocialShare = (platform) => {
    // Set share action to trigger animation
    setShareAction(platform);
    
    // Generate share URL
    let shareUrl = window.location.href;
    const text = "Check out NewsAiPet - Your premier source for AI news and breakthroughs!";
    
    let url = '';
    
    switch(platform) {
      case 'x':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct link sharing through URL
        // Usually redirects to Instagram app or website
        break;
      default:
        break;
    }
    
    // Open share URL in new window
    if (url) {
      window.open(url, '_blank');
    }
    
    // Reset after 2 seconds
    setTimeout(() => {
      setShareAction(null);
    }, 2000);
  };
  
  return (
    <footer className="bg-gray-800 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-20 left-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-40 left-2/3 w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2.2s' }}></div>
      <div className="absolute top-60 left-1/5 w-4 h-4 bg-indigo-400 rounded-full opacity-10 animate-float" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 group">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center group-hover:animate-pulse">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold">
                <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">News</span>
                <span className="text-gray-200 group-hover:text-white transition-colors duration-300">Ai</span>
                <span className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">Pet</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4">Your premier source for AI news and breakthroughs.</p>
            <div className="flex space-x-4">
              {/* X (Twitter) */}
              <button 
                onClick={() => handleSocialShare('x')}
                className="relative text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                {shareAction === 'x' && (
                  <span className="absolute -top-2 -right-2 flex h-3 w-3 animate-ping">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </button>
              
              {/* Facebook */}
              <button 
                onClick={() => handleSocialShare('facebook')}
                className="relative text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
                {shareAction === 'facebook' && (
                  <span className="absolute -top-2 -right-2 flex h-3 w-3 animate-ping">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </button>
              
              {/* WhatsApp */}
              <button 
                onClick={() => handleSocialShare('whatsapp')}
                className="relative text-gray-400 hover:text-green-500 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                {shareAction === 'whatsapp' && (
                  <span className="absolute -top-2 -right-2 flex h-3 w-3 animate-ping">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </button>
              
              {/* Instagram */}
              <button 
                onClick={() => handleSocialShare('instagram')}
                className="relative text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {shareAction === 'instagram' && (
                  <span className="absolute -top-2 -right-2 flex h-3 w-3 animate-ping">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block group">
              Quick Links
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </h4>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={index} className="transform transition-transform duration-300 hover:-translate-x-1 group">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block group">
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </h4>
            <ul className="space-y-2">
              {['AI Research', 'Machine Learning', 'Robotics', 'Ethics & Policy', 'Industry News'].map((item, index) => (
                <li key={index} className="transform transition-transform duration-300 hover:-translate-x-1 group">
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block group">
              Subscribe
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </h4>
            <p className="text-gray-400 mb-4">Get the latest AI news delivered to your inbox.</p>
            <div className="relative">
              <div className="flex relative z-10">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  value={email}
                  onChange={handleEmailChange}
                  disabled={subscribed || loading}
                  className={`flex-grow px-3 py-2 rounded-l-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${subscribed ? 'opacity-50' : ''}`}
                />
                <button 
                  onClick={handleSubscribe}
                  disabled={loading || !email || !email.includes('@')}
                  className={`px-4 py-2 rounded-r-lg overflow-hidden relative ${loading ? 'bg-gray-600 cursor-wait' : (!email || !email.includes('@')) ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 group`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="absolute inset-0 h-full w-0 bg-white bg-opacity-20 transition-all duration-300 group-hover:w-full"></span>
                    </>
                  )}
                </button>
              </div>
              
              {subscribed && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-600 rounded-lg animate-fadeIn p-2">
                  <svg className="w-5 h-5 text-white mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-white font-medium text-sm">Subscribed to updates!</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4 group hover:scale-110 transition-transform duration-300">
            <div className="w-6 h-6 bg-blue-500 rounded-full group-hover:animate-pulse"></div>
            <span className="font-medium relative">
              By Peter News
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} NewsAiPet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Add custom styles for hiding scrollbars but keeping functionality
const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes gradient-x {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 3s ease infinite;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
    }
    50% {
      transform: translateY(-10px) translateX(5px);
    }
    100% {
      transform: translateY(0) translateX(0);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  /* Add delay classes for the loading animation */
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
  .delay-600 { animation-delay: 0.6s; }
  .delay-700 { animation-delay: 0.7s; }
  .delay-800 { animation-delay: 0.8s; }
  .delay-900 { animation-delay: 0.9s; }
  
  .animation-delay-150 { animation-delay: 150ms; }
  .animation-delay-300 { animation-delay: 300ms; }
`;
document.head.appendChild(style);

export default App;
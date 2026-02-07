/**
 * Hardcoded Season 2 participant profiles.
 * Supabase competition_participants often has null name/picture,
 * so we use this map as a fallback for display names and avatars.
 *
 * Source: runstr.project/src/constants/season2.ts
 */

export interface KnownParticipant {
  npub: string;
  name: string;
  picture?: string;
}

export const KNOWN_PARTICIPANTS: KnownParticipant[] = [
  {
    npub: 'npub1xr8tvnnnr9aqt9vv30vj4vreeq2mk38mlwe7khvhvmzjqlcghh6sr85uum',
    name: 'TheWildHustle',
    picture: 'https://m.primal.net/MgUN.png',
  },
  {
    npub: 'npub1w30t22wsuskjlfkfqjau9sg8qt02a9jtfhfs0xqr4w95x5mdmgfqghvnqu',
    name: 'guy',
    picture: 'https://i.ibb.co/tykKfq5/360-F-1030875797-1-Fmro-Dfu0g-DKB1-Tu32-Eti-My8-LVq-Uw-Un9.webp',
  },
  {
    npub: 'npub1mtnnlhvsmxxmr2zqt08v43sv6m8g6yyfdf4zchsyqygjtctv6seqp93ten',
    name: 'Lhasa Sensei',
    picture: 'https://blossom.primal.net/ab12c1a745b1bad98e46be3f5024d5176863ba6459beb22e5b2430bd9db95291.gif',
  },
  {
    npub: 'npub1gvjkhsy9j33v79860hjeffyt40033xu34038lzxcyj4ldxerg0yss3qlym',
    name: 'LOPES',
    picture: 'https://m.primal.net/Nsgy.png',
  },
  {
    npub: 'npub1ul0kylrr3kf5kd653kzq3dpach28vtazwrpx40k9j94l7c42eqxsstw6df',
    name: 'KjetilR',
    picture: 'https://m.primal.net/LVZP.png',
  },
  {
    npub: 'npub1jdvvva54m8nchh3t708pav99qk24x6rkx2sh0e7jthh0l8efzt7q9y7jlj',
    name: 'Kamo Weasel',
    picture: 'https://m.primal.net/QZXK.png',
  },
  {
    npub: 'npub1ex2rmruwns42n7ktdete4ahv8zmjqhq9wr0pkraclx0kthzl0phq8csq9m',
    name: 'Zed',
    picture: 'https://blossom.primal.net/88a48fbf931568244f4be6f2ef7d37cda8552a0d40bcb79ed5a89885fc601c3a.png',
  },
  {
    npub: 'npub1ddp28v38kzrws58lvkdp2xrrecrsadsdx2aw3frp3y5x2hhlc0mqtzvsf9',
    name: 'JokerHasse',
    picture: 'https://nostr.build/i/nostr.build_d7d16548a7d946f91603b7f552a1e042549b86dd50d99daeda08d57b994b1f2a.jpg',
  },
  {
    npub: 'npub1psjjcyuwu3rtd7wqje8lvzfcplyzu5kg6vv999s872flehuz304qmz4l7p',
    name: 'Busch21',
    picture: 'https://blossom.primal.net/e73840651647c07e95a0356718c87562af9a983b0b6fafbedd725645230739de.png',
  },
  {
    npub: 'npub1ezezhqv80649fcdty83esf8ctg57v8m3m20m4wl03yctzude3k5q5a4tlz',
    name: 'Hoov',
    picture: 'https://m.primal.net/HhOq.jpg',
  },
  {
    npub: 'npub13n5htata6pcvg2fllruh3wrfug9jeh6vs8e80dr0xemtyck9aq3sfhp723',
    name: 'clemsy',
    picture: 'https://blossom.primal.net/6c5d81bdca2a131e91c6ee6f10941fd676d4365902aff10705dde8f75fabd48c.png',
  },
  {
    npub: 'npub1nl8r463jkdtr0qu0k3dht03jt9t59cttk0j8gtxg9wea2russlnq2zf9d0',
    name: 'MAKE SONGS LONGER',
    picture: 'https://blossom.primal.net/95b02bc70259ab5d3d4584ba1dd24b2d6bf3a058b8eb2edb885ef677b33b6d0c.jpg',
  },
  {
    npub: 'npub1u53hqga9czffu7hqu5fg6sdgyycnssqwcygdh6wc52f83u3t0sfstpnzt7',
    name: 'Helen Yrmom',
    picture: 'https://blossom.primal.net/291700056891e12a17865ee3808a709fe25d20b351a9005f38d8105f1fc43b5d.jpg',
  },
  {
    npub: 'npub1qfe57xw2u7zsu772ds9zhd49xnc494dvhkrwansa90aat4jsyqpssngt8g',
    name: 'bitcoin_rene',
    picture: 'https://nostr.build/i/nostr.build_b170a33c6f921b899aa14fdf70fe0b65e5786285aa66a8a7945f1c06c4157870.jpg',
  },
  {
    npub: 'npub1jw0lknj49m2up7ncpxz6kutr73qhnpqf4elds8rzcpavg6pmgg3qwxuhwk',
    name: 'Johan',
    picture: 'https://nostr.build/i/nostr.build_e3338a15cc572217a5ea9a9a3ce47b509e8b1377c710bc93006c78834fae687e.jpeg',
  },
  {
    npub: 'npub1tfj5kcu5hwp7esdet7zg667yfekjzysduhvrypq8qnvcywevpt6qkc2lh4',
    name: 'Drew',
    picture: 'https://m.primal.net/HrEg.jpg',
  },
  {
    npub: 'npub1t4q9w5kpknwaqu2t4u7wg9wm2tj4qcpk7dzl7467u9hzkn833xlskuf4sn',
    name: 'Heiunter',
    picture: 'https://cdn.nostr.build/i/f084c8a8afc63678a61112c91456c608c2655fb5513d87332f242d4305c32a57.jpg',
  },
  {
    npub: 'npub1zn9f0j4w59t9mslcyaeef28h6qekgaz635v9xmvyy0d6c0ek8dlsqk87vm',
    name: 'Satty',
    picture: 'https://blossom.primal.net/f030ac8d0429b2ed68ab9760ece83514b8818a5e9a0c74d6b915544d735dd1f5.webp',
  },
  {
    npub: 'npub1meatjvk2zunckg2y5e3gcdf35p3glnrmtqr5zywkuku5nm9sudmstwnglh',
    name: "Harambe's last Bitcoin",
    picture: 'https://image.nostr.build/cde9e47357893714a00325e50db89852a49b8ed0e28f5f484e4d5949b1d1184e.jpg',
  },
  {
    npub: 'npub14q8uffuxxnhzd24u4j23kn8a0dt2ux96h5eutt7u76lddhyqa0gs97ct2x',
    name: 'Uno',
    picture: 'https://blossom.primal.net/8f604992bbc8652808ca2763f06f597dfd9fd21efee398683dc5e58e082ec714.png',
  },
  {
    npub: 'npub15u3cqhx6vuj3rywg0ph5mfv009lxja6cyvqn2jagaydukq6zmjwqex05rq',
    name: 'Seth',
    picture: 'https://i.nostr.build/pRrD6BPp2M05Z31M.jpg',
  },
  {
    npub: 'npub1pt5ach6zl673r3wgjkc27za6h0szyc2erv8jfmh7ytqdnj5dq2rquawufz',
    name: 'MoonKaptain',
    picture: 'https://blossom.primal.net/39f3d364d516b6106387d487fa5cc25d98c4ba294eebad91fe2f13bb79dc7287.png',
  },
  {
    npub: 'npub1ltvqkaz3kqlksm7eujrmqkmfcpxgpr3x58dk2hjeur3fdfwf7nws8szhw6',
    name: 'means',
    picture: 'https://image.nostr.build/962c5089eb4c09cc25d86ef63c6174a13a4f2cebf820286d1454972768ef3a76.jpg',
  },
  {
    npub: 'npub14yzxejghthz6ghae8gkgjru63vvvwpl6d454wud2hycqpqwnugdqcutuw5',
    name: 'Ben Cousens',
    picture: 'https://blossom.primal.net/c119a84481ab06f84ca9f06ef2abd5524ad167048f8a61980624b705c7307dc9.jpg',
  },
  {
    npub: 'npub1yrffsyxk5hujkpz6mcpwhwkujqmdwswvdp4sqs2ug26zxmly45hsfpn8p0',
    name: 'negr0',
    picture: 'https://blossom.primal.net/03865dd9c2391a6f90400e0d766aa73b98b210f91f4c677d81966df3572c1d0c.jpg',
  },
  {
    npub: 'npub1ag5y3zm9n2myxvt8e5pyadewqx3httqhee22rnwxuhww9ake8y3slsekr3',
    name: 'johnny9',
    picture: 'https://avatars.githubusercontent.com/u/985648?v=4',
  },
  {
    npub: 'npub1cmc0gfulzgsq7alpjs7dy64wmasgrldgtptft7dfyw68yd5xmgfqaf9e4n',
    name: 'Tumbleweed',
    picture: 'https://nostr.build/i/9554b4ae5b616d7061d27d9ba681f378ac698e87f8211029639551e63b31a13c.jpg',
  },
  {
    npub: 'npub1vcfs2z24y2sc5yy4k7uxsa80vxx6n3w3hf054um4dz8zz2wqwvtsgtkxyw',
    name: 'Ajax',
    picture: 'https://image.nostr.build/b4f666928cb68134d509ea317f0116fbb7d5ddd59157db6dd4f8845315fffd86.jpg',
  },
  {
    npub: 'npub1jva9yqypze6re4jjajj8yz040ex2f3pemrp9ymvvfzj8hac89mrszp5ev6',
    name: 'Nell',
    picture: 'https://blossom.primal.net/c2d4792e12fc0a58ca5245714f2c98a3116dbf8bbb6f1cd3b610f8ccc54bc48d.jpg',
  },
  {
    npub: 'npub1xyh4fksd588seh836cu9l2xkuhvzrrm3yg5h6v9jyjpwmtdygeysgf47df',
    name: 'HumbleStacker',
  },
  {
    npub: 'npub1jstpzth68nwqvag4dextdtjxktx22xtnqewxr09uqqk2n8jaeheq5afdtj',
    name: 'Lat51_Training',
    picture: 'https://blossom.primal.net/3e0427881f8228022634eb20d267bce00682d9b64d3d6328b363416108637cdb.jpg',
  },
  {
    npub: 'npub1patrlck0muvqevgytp4etpen0xsvrlw0hscp4qxgy40n852lqwwsz79h9a',
    name: 'Patrick',
    picture: 'https://relay.patrickulrich.com/8376dba8728c2672acc10b7a5fce3f7cbde9299a4c0151b34b6a431d48715652.png',
  },
  {
    npub: 'npub1mpz30qp2gdr403t2apjzhla56fh94hs8zgznw5pp26q0tztw27dsu60pxm',
    name: 'ObjectiF MooN',
    picture: 'https://blossom.primal.net/2a29897df066512e623e73f4bf5c4bf084976127d59d73cd22da76379ca238a2.jpg',
  },
  {
    npub: 'npub1a6c3jcdj23ptzcuflek8a04f4hc2cdkat95pd6n3r8jjrwyzrw0q43lfrr',
    name: 'OpenMike',
    picture: 'https://image.nostr.build/eba711a14a30726d5dd454b802d343bb17d8b0db7e477eed9eef7d4b8d65ef7a.jpg',
  },
  {
    npub: 'npub1sxu32sx6amsrrhesj3s2n084se49f3czzll3ww7dalgestcjkzaqfa3ftn',
    name: 'Aaron Tomac',
    picture: 'https://blossom.primal.net/dc0b8135dcefd0840ae3d124f283b7161bcdcbefd44b8966576fac77261d1cd9.jpg',
  },
  {
    npub: 'npub106auuxzr597dw799u95785hk0866c763yhgug0fxtcvs77e82wxqsac5uf',
    name: 'Adrien Lacombe',
  },
  {
    npub: 'npub1z7g4fs4nqgn90zs543dqrag28m77352qxt0evdc42rsjzrllmzfqdl96ge',
    name: 'Awakening Mind',
    picture: 'https://blossom.primal.net/e8c5c80b16dc84aceaa759ba091528c704e4bd44ce121927705c3e4b9a96d582.png',
  },
  {
    npub: 'npub1ra5ch494mk5qgvt0p9mnlypu56vu7ke2plx4k0lxupcfv6x43esqre4rvx',
    name: 'Dani',
    picture: 'https://pbs.twimg.com/profile_images/1608301873865408513/Ysbig7Wv_400x400.jpg',
  },
  {
    npub: 'npub1smm7agrxm4xu2axsrv8ex9aqx5ygslupt76cmrhkdpeucsh7xscsd8zl76',
    name: 'Taljarn',
  },
  {
    npub: 'npub1qsvv5ttv6mrlh38q8ydmw3gzwq360mdu8re2vr7rk68sqmhmsh4svhsft3',
    name: 'saiy2k',
    picture: 'https://pbs.twimg.com/profile_images/1621557922257072129/y4GR5EFG_400x400.jpg',
  },
  {
    npub: 'npub1243jnepytmzg38pnk2fx9jznxksg9shztnggk60lgmshuu9hshkqzdh58w',
    name: 'OrangePillosophy',
    picture: 'https://blossom.primal.net/3c33216e58dcfa8f24803302b642eb4ccb069d63002b62d2cc18fdcb6981f1d4.png',
  },
  {
    npub: 'npub15fsrezzy8t632fv970urdqe2va23u0k26rj85s6u34j3p233eppsxm7lkd',
    name: 'Carol',
    picture: 'https://m.primal.net/OHIp.jpg',
  },
  {
    npub: 'npub1yj69jq9f977y2f7vl96m6stf3rjyf3hym8ekf3g4senlqamz8l3qfsvhk7',
    name: 'Jose Sammut',
    picture: 'https://image.nostr.build/afa74223797c545885199106cc57e9f4811e7e6cffd7f398b15042f29051747e.jpg',
  },
];

/** Lookup map: npub → { name, picture } */
export const KNOWN_PARTICIPANT_MAP = new Map(
  KNOWN_PARTICIPANTS.map((p) => [p.npub, { name: p.name, picture: p.picture }]),
);

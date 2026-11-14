/* Content data for the ideology guide pages.
   pos: {e,c,s,g} on 0-100 — e = economic left→right, c = order→liberty,
   s = tradition→change, g = nation→one world (same axes as the test). */

export const SITE = {
  name: 'Political Spectrum Test',
  domain: 'https://politicalspectrumtest.online',
  year: 2026
};

export const AXES = {
  econ: { left: 'Economic left', right: 'Economic right' },
  civ: { left: 'Order first', right: 'Liberty first' },
  soc: { left: 'Hold to tradition', right: 'Open to change' },
  geo: { left: 'Nation first', right: 'One world' }
};

export const ideologies = [
  {
    slug: 'social-democracy',
    name: 'Social Democracy',
    tagline: 'A market economy tamed by a strong welfare state.',
    desc: 'What social democracy believes: universal services, regulated markets, worker rights — and where it sits on the political spectrum. A plain-English guide.',
    lede: 'Social democracy keeps the market economy but insists that democracy — not money — sets its rules. Universal public services, strong worker rights, and a safety net no one falls through are its signature; the Nordic countries are its showcase.',
    pos: { e: 36, c: 70, s: 66, g: 62 },
    extraSources: [
      { label: 'The Nordic model — an overview', url: 'https://en.wikipedia.org/wiki/Nordic_model' }
    ],
    poles: { econ: 'Center-left', civ: 'Liberty-leaning', soc: 'Progressive', geo: 'Globalist' },
    beliefs: [
      'Universal healthcare, education, and a strong social safety net',
      'Markets kept competitive — regulated where they fail, freed where they work',
      'Strong unions and collective bargaining as a democratic counterweight',
      'Liberal civil rights, free speech, and the rule of law',
      'International cooperation on climate, trade, and human rights',
      'Gradual, democratic reform rather than revolution'
    ],
    figures: [
      { name: 'Olof Palme', life: 'Sweden, 1927–1986', line: 'Prime minister who turned Sweden into the model welfare state and a voice for global solidarity.' },
      { name: 'Clement Attlee', life: 'United Kingdom, 1883–1967', line: 'Built the National Health Service and the post-war British welfare settlement.' },
      { name: 'Willy Brandt', life: 'Germany, 1913–1992', line: 'Chancellor of West Germany; pursued Ostpolitik and championed North–South justice.' }
    ],
    related: [
      { name: 'Democratic Socialism', slug: 'democratic-socialism', chip: 'Further left', line: 'Wants ownership itself to change — worker control of industry, not just regulation of it.' },
      { name: 'Progressivism', slug: 'progressivism', chip: 'Neighbour', line: 'Shares the goals, focuses more on reforming institutions and culture than on the economy.' },
      { name: 'Social Liberalism', slug: null, chip: 'Further right', line: 'Agrees on rights and reform, but puts more faith in markets and less in the state.' }
    ],
    faq: [
      { q: 'What is social democracy in simple terms?', a: 'Keep the market economy, but make sure democracy — not money — sets its rules: universal public services, strong worker rights, and a safety net that no one can fall through.' },
      { q: 'How is social democracy different from democratic socialism?', a: 'Social democracy accepts capitalism and regulates it; democratic socialism wants to replace private ownership of major industries with collective or worker ownership. In practice many parties blur the line — and the terms have shifted over time, since “social democracy” once meant what democratic socialism means today.' },
      { q: 'Which countries are social democracies?', a: 'The Nordic countries — Denmark, Sweden, Norway, and Finland — are the classic examples, combining market economies with universal services and high union membership. Many Western European countries mix social-democratic policies into broader welfare systems.' },
      { q: 'Is social democracy left or right?', a: 'Center-left: left on economics (redistribution, universal services) and broadly liberal on civil liberties. On a spectrum it sits right of democratic socialism and left of social liberalism.' },
      { q: 'What do social democrats think about taxes?', a: 'They support progressive taxation — higher rates on higher incomes and wealth — to fund universal services. They argue this buys social mobility and stability; critics answer that it can dampen investment and work incentives. The Nordic evidence is debated on both sides.' },
      { q: 'Which parties are social democratic?', a: 'Parties in the social-democratic family include Sweden’s SAP, Germany’s SPD, the mainstream of the UK Labour Party, and most members of the Party of European Socialists. Outside Europe the labels vary — some parties use “labor”, “socialist”, or “progressive” for similar traditions.' },
      { q: 'Does social democracy work?', a: 'Advocates point to the Nordic countries’ high living standards, social mobility, and trust in institutions. Critics point to high taxes and historical economic shocks. Most economists read the lesson as: generous welfare states and competitive markets can coexist — but policy design matters enormously.' },
      { q: 'Where did social democracy come from?', a: 'From the socialist movement of the late 19th century. After 1917, most Western European socialist parties chose ballots over revolution and gradually embraced the market economy; post-1945 reconstruction turned that compromise into the modern welfare state.' }
    ]
  },

  {
    slug: 'liberalism',
    name: 'Liberalism',
    tagline: 'Individual rights, open markets, limited government.',
    desc: 'What liberalism believes: individual rights, consent, free markets, tolerance — and where it sits on the political spectrum. A plain-English guide.',
    lede: 'Liberalism starts from the individual: rights that precede the state, consent as the basis of government, and markets and tolerance as the default. Its classical wing wants the state small; its social wing wants the state to guarantee real opportunity.',
    pos: { e: 68, c: 80, s: 60, g: 64 },
    extraSources: [
      { label: 'Stanford Encyclopedia of Philosophy: Liberalism', url: 'https://plato.stanford.edu/entries/liberalism/' },
      { label: 'Encyclopaedia Britannica: Liberalism', url: 'https://www.britannica.com/topic/liberalism' }
    ],
    poles: { econ: 'Center-right', civ: 'Liberty-first', soc: 'Mixed', geo: 'Globalist-leaning' },
    beliefs: [
      'Individual rights — speech, conscience, association — that the state may not override',
      'Government by consent and the rule of law, under a constitution',
      'Free markets and free trade as the default economic arrangement',
      'Tolerance of different lifestyles and beliefs',
      'Secular public institutions',
      'Skepticism of concentrated power — in states and monopolies alike'
    ],
    figures: [
      { name: 'John Locke', life: 'England, 1632–1704', line: 'Argued that life, liberty, and property are natural rights and that governments exist only by consent.' },
      { name: 'Adam Smith', life: 'Scotland, 1723–1790', line: 'Showed how self-interest in open markets can produce general prosperity.' },
      { name: 'John Stuart Mill', life: 'Britain, 1806–1873', line: 'Drew the line of liberty: the only justified limit on freedom is harm to others.' }
    ],
    related: [
      { name: 'Libertarianism', slug: 'libertarianism', chip: 'Further', line: 'Takes liberal skepticism of the state nearly all the way — minimal state, maximal markets.' },
      { name: 'Conservatism', slug: 'conservatism', chip: 'Neighbour', line: 'Agrees about markets and law; parts ways over how fast society should change.' },
      { name: 'Social Democracy', slug: 'social-democracy', chip: 'Further left', line: 'Keeps liberal rights but wants a much larger state role in the economy.' }
    ],
    faq: [
      { q: 'What is liberalism in simple terms?', a: 'The individual comes first. People have rights the state can’t take away, governments need consent, and markets and tolerance are the defaults. Disputes inside liberalism are mostly about how big the state should be to make those rights real.' },
      { q: 'What’s the difference between classical and social liberalism?', a: 'Classical liberalism wants a small “night-watchman” state: law, order, defense, and little else. Social liberalism argues that rights mean little without education, healthcare, and a floor under poverty — so the state should actively secure opportunity. Most center-left and center-right parties borrow from both.' },
      { q: 'Is liberalism left or right?', a: 'Both, historically: liberals led revolutions for constitutions and free markets, and today “liberal” means center-right in much of Europe and center-left in the United States. On our dimensions, liberalism is liberty-first on civil liberties and typically center-right on economics.' },
      { q: 'How is liberalism different from conservatism?', a: 'Liberals celebrate change and individual choice; conservatives see institutions and customs as accumulated wisdom that change should not rush. They can ally on markets and the rule of law, and split on social issues and the pace of reform.' },
      { q: 'How is liberalism different from libertarianism?', a: 'Libertarianism is classical liberalism taken further: taxes and regulation are treated as near-injustices and the state shrinks toward a minimum. Liberals generally accept taxation for public goods and some correction of markets.' },
      { q: 'Which parties are liberal?', a: 'Many carry the label: the UK Liberal Democrats, Germany’s FDP, the Dutch VVD, Canada’s Liberal Party — though the last governs well left of classical liberalism. In the US, “liberal” usually means the social-liberal center-left.' },
      { q: 'Where does liberalism come from?', a: 'From the 17th–18th century Enlightenment — Locke, Montesquieu, Smith — and the American and French revolutions. It supplied the vocabulary of constitutional government, rights, and markets that nearly every modern democracy now speaks.' },
      { q: 'What are the main criticisms of liberalism?', a: 'That it underestimates unequal starting points (the social-liberal reply), that markets produce concentrations of power liberalism itself distrusts, and that radical individualism can erode the communities individuals rely on.' }
    ]
  },

  {
    slug: 'conservatism',
    name: 'Conservatism',
    tagline: 'Change should be gradual; institutions carry wisdom.',
    desc: 'What conservatism believes: gradual reform, family, faith, nation — and where it sits on the political spectrum. Key figures, history, FAQs inside.',
    lede: 'Conservatism treats society as an inheritance: customs, family, faith, and nation hold accumulated wisdom no blueprint can replace. Reform is welcome — when it respects what already works and moves at a pace people can absorb.',
    pos: { e: 62, c: 45, s: 28, g: 42 },
    extraSources: [
      { label: 'Stanford Encyclopedia of Philosophy: Conservatism', url: 'https://plato.stanford.edu/entries/conservatism/' }
    ],
    poles: { econ: 'Center-right', civ: 'Balanced', soc: 'Traditional', geo: 'Somewhat nation-first' },
    beliefs: [
      'Gradual, pragmatic change over grand designs',
      'Family, faith, and community as the fabric of society',
      'Personal responsibility alongside a reasonable state floor',
      'Free enterprise, tempered by a preference for stability',
      'Strong law enforcement and national defense',
      'Patriotism and the nation as a community of obligation'
    ],
    figures: [
      { name: 'Edmund Burke', life: 'Ireland and Britain, 1729–1797', line: 'Defended gradual reform against revolutionary abstraction; the intellectual father of modern conservatism.' },
      { name: 'Margaret Thatcher', life: 'United Kingdom, 1925–2013', line: 'Remade British conservatism around free markets, individual responsibility, and a strong state at home and abroad.' },
      { name: 'Angela Merkel', life: 'Germany, born 1954', line: 'Showed a pragmatic, cautious center-right — incremental change, stability, and coalition management.' }
    ],
    related: [
      { name: 'National Conservatism', slug: 'national-conservatism', chip: 'Further', line: 'Puts sovereignty, borders, and cultural tradition first — harder on immigration and international bodies.' },
      { name: 'Liberalism', slug: 'liberalism', chip: 'Neighbour', line: 'Shares markets and the rule of law; liberalism is more comfortable with rapid social change.' },
      { name: 'Centrism', slug: 'centrism', chip: 'Neighbour', line: 'Borrows conservative prudence without the tradition-first instinct.' }
    ],
    faq: [
      { q: 'What is conservatism in simple terms?', a: 'Don’t break what works. Society’s customs and institutions carry hard-won wisdom, so change should be careful, tested, and gradual — and some things (family, faith, nation) deserve protection regardless of fashion.' },
      { q: 'Is conservatism left or right?', a: 'Usually center-right: right on economics (markets, lower taxes) and traditional on social issues. But conservatism is defined more by its attitude to change than by any fixed policy — one-nation conservatives have backed welfare states enthusiastically.' },
      { q: 'What is “one-nation” conservatism?', a: 'A British tradition, from Benjamin Disraeli onward, holding that society is one body and the better-off have obligations to the worse-off. It accepts a welfare state and public services to keep the nation whole.' },
      { q: 'How is conservatism different from libertarianism?', a: 'Both favor markets, but conservatism accepts state power for order, borders, and tradition, while libertarianism wants the state out of both the economy and private life. Conservatives also keep institutions — the army, the church, the family — that libertarians view with suspicion.' },
      { q: 'Do conservatives oppose all change?', a: 'No — Burke’s point was that a state without the ability to reform cannot preserve anything. Conservatism prefers incremental, evidence-tested reform to transformation; its quarrel is with pace and hubris, not direction as such.' },
      { q: 'Which parties are conservative?', a: 'The UK Conservatives, Germany’s CDU/CSU, Japan’s LDP, India’s BJP, and the US Republican Party all sit in the conservative family, though each blends conservatism differently with liberalism or nationalism.' },
      { q: 'What role does religion play in conservatism?', a: 'Historically central — conservatism defended established churches and religious morality. Today most conservative parties govern secularly but still defend faith communities’ place in public life.' },
      { q: 'What are the main criticisms of conservatism?', a: 'That “institutions carry wisdom” can be cover for entrenched privilege, that gradualism just delays necessary reform, and that defending tradition can slide into defending hierarchy. Conservatives answer that reformers’ certainty has a worse track record.' }
    ]
  },

  {
    slug: 'democratic-socialism',
    name: 'Democratic Socialism',
    tagline: 'Democracy extended into the workplace and the economy.',
    desc: 'What democratic socialism believes: worker ownership, universal services, democracy in the economy — and where it sits on the spectrum. A plain-English guide.',
    lede: 'Democratic socialism goes further than regulating markets: it wants the big levers of the economy — major industries, finance, large firms — under collective or worker control, chosen through ballots and unions rather than revolution.',
    pos: { e: 15, c: 70, s: 68, g: 62 },
    extraSources: [
      { label: 'Encyclopaedia Britannica: Socialism', url: 'https://www.britannica.com/topic/socialism' }
    ],
    poles: { econ: 'Left', civ: 'Liberty-leaning', soc: 'Progressive', geo: 'Globalist' },
    beliefs: [
      'The economy should serve human needs, not shareholder returns alone',
      'Worker ownership and co-determination in major firms',
      'Universal public services: healthcare, education, housing, transport',
      'Political democracy extended into economic life',
      'Deep reduction of economic inequality',
      'International solidarity — and firm anti-authoritarianism at home'
    ],
    figures: [
      { name: 'Eugene V. Debs', life: 'United States, 1855–1926', line: 'Railway union leader and five-time Socialist presidential candidate who argued for socialism through the ballot.' },
      { name: 'George Orwell', life: 'Britain, 1903–1950', line: 'Fought with republican militias in Spain and defined democratic socialism against both exploitation and tyranny.' },
      { name: 'Bernie Sanders', life: 'United States, born 1941', line: 'Brought the term “democratic socialist” into mainstream American politics on a platform of universal services and worker power.' }
    ],
    related: [
      { name: 'Social Democracy', slug: 'social-democracy', chip: 'Neighbour', line: 'Accepts capitalism and regulates it; democratic socialism wants ownership itself to change.' },
      { name: 'Green Politics', slug: 'green-politics', chip: 'Neighbour', line: 'Shares the critique of profit-driven growth; adds ecological limits as the core constraint.' },
      { name: 'Populism', slug: 'populism', chip: 'Neighbour', line: 'Left-populism borrows the anti-oligarchy economics without the full ownership program.' }
    ],
    faq: [
      { q: 'What is democratic socialism in simple terms?', a: 'Socialism, but only by consent: winning elections, running unions, and building worker power instead of seizing the state. The economy’s commanding heights should be collectively owned; political rights should be untouchable.' },
      { q: 'How is democratic socialism different from communism?', a: 'Communism in power has meant one-party states and abolished political competition. Democratic socialism is defined by the opposite commitment: multiparty elections, civil liberties, and pluralism — Orwell’s position against both exploitation and tyranny.' },
      { q: 'How is it different from social democracy?', a: 'Social democrats accept capitalism and tax-and-regulate it; democratic socialists want to change ownership itself — co-determination, public ownership of key sectors, worker cooperatives. In practice many parties straddle the line; European social-democratic parties had explicitly socialist goals until the 1950s–60s.' },
      { q: 'Is democratic socialism left or right?', a: 'Firmly left: furthest-left on economics among democratically committed ideologies, and generally liberty-leaning and progressive otherwise.' },
      { q: 'Does it mean Soviet-style planning?', a: 'No. Democratic socialists reject one-party rule and, for the most part, command-economy planning. Proposals usually mix public ownership of natural monopolies, cooperatives, and strong labor rights within a mixed economy.' },
      { q: 'Which parties or movements are democratic socialist?', a: 'The US Democratic Socialists of America (Bernie Sanders is aligned with it), the left wing of the UK Labour Party, and many small European left parties. Labels vary — some say “democratic socialist”, others “socialist” or “labour left”.' },
      { q: 'Where does democratic socialism come from?', a: 'From the democratic wing of 19th-century socialism — Eduard Bernstein’s “revisionism”, which chose ballots over revolution — and from parties that kept socialist aims alive after 1945.' },
      { q: 'What are the main criticisms of democratic socialism?', a: 'That collective ownership dulls innovation and efficiency, that “democratic control” of an economy is hard to specify, and that redistribution shrinks the pie. Supporters answer with Nordic prosperity and cooperative-sector evidence — while conceding the design questions are hard.' }
    ]
  },

  {
    slug: 'libertarianism',
    name: 'Libertarianism',
    tagline: 'Maximum personal and economic freedom, minimal state.',
    desc: 'What libertarianism believes: self-ownership, free markets, minimal state, personal freedom — and where it sits on the spectrum. A plain-English guide.',
    lede: 'Libertarianism starts from self-ownership: your life, labor, and property are yours. The state’s job shrinks to protecting people from force and fraud — everything else, from schools to sobriety, is left to voluntary choice and free markets.',
    pos: { e: 82, c: 92, s: 55, g: 62 },
    extraSources: [
      { label: 'Stanford Encyclopedia of Philosophy: Libertarianism', url: 'https://plato.stanford.edu/entries/libertarianism/' }
    ],
    poles: { econ: 'Right', civ: 'Liberty-first', soc: 'Mixed', geo: 'Globalist-leaning' },
    beliefs: [
      'Self-ownership: your body, labor, and property are yours by right',
      'The non-aggression principle: force is justified only in defense',
      'A minimal state — courts, police, defense — or none at all',
      'Free markets, free trade, and stable money',
      'Legal personal choices: speech, association, drugs, arms (extent debated)',
      'Skepticism of bureaucracy, surveillance, and foreign wars'
    ],
    figures: [
      { name: 'John Stuart Mill', life: 'Britain, 1806–1873', line: 'The harm principle — liberty needs no justification; limiting it does.' },
      { name: 'Friedrich Hayek', life: 'Austria and Britain, 1899–1992', line: 'Argued central planning fails because knowledge is dispersed; markets aggregate it.' },
      { name: 'Milton Friedman', life: 'United States, 1912–2006', line: 'Made the case for free markets, school choice, and voluntary solutions in accessible prose.' }
    ],
    related: [
      { name: 'Liberalism', slug: 'liberalism', chip: 'Moderate neighbour', line: 'Shares the rights-and-markets core but accepts taxation for public goods.' },
      { name: 'Centrism', slug: 'centrism', chip: 'Far opposite', line: 'Represents the compromise-first method libertarianism rejects as unprincipled.' },
      { name: 'Conservatism', slug: 'conservatism', chip: 'Ally on markets', line: 'Allies on free enterprise; splits on state power over morality, borders, and security.' }
    ],
    faq: [
      { q: 'What is libertarianism in simple terms?', a: 'Live and let live, and keep the state small. People should be free to run their lives, spend their money, and make their own deals; government exists only to stop force, theft, and fraud.' },
      { q: 'What’s the difference between left- and right-libertarianism?', a: 'Both want maximal liberty and a minimal state; they differ on property. Right-libertarians treat private property as foundational; left-libertarians accept strong personal liberty but question how property holdings became unequal. In the US, “libertarian” usually means the right-libertarian version.' },
      { q: 'How is libertarianism different from liberalism?', a: 'Liberalism accepts taxation for public goods, antitrust, and a social floor; libertarianism treats most taxation as near-confiscation and most regulation as market interference. Classical liberalism is its more compromise-ready cousin.' },
      { q: 'What do libertarians think about taxes?', a: 'Most see them as justified only for core functions — courts, police, defense — or not at all; anarcho-capitalists would replace taxation with voluntary payment. Mainstream libertarians often favor flat or consumption taxes.' },
      { q: 'What about drugs, guns, and speech?', a: 'Consistently permissive: legalize drugs, protect gun rights, and defend nearly all speech — positions that follow from self-ownership and the non-aggression principle. Specific edges, like age limits and weapon types, are debated internally.' },
      { q: 'Which parties are libertarian?', a: 'The US Libertarian Party is the flagship, with smaller counterparts elsewhere. In other countries, classical-liberal parties — Germany’s FDP, Switzerland’s FDP — carry parts of the agenda.' },
      { q: 'Where does libertarianism come from?', a: 'From radical currents of classical liberalism (Auberon Herbert, Lysander Spooner) and from 20th-century economists Hayek, Friedman, and Mises, plus Ayn Rand’s popular fiction. The US Libertarian Party launched in 1971.' },
      { q: 'What are the main criticisms of libertarianism?', a: 'That markets need referees and public goods — roads, research, clean air — that markets under-supply; that “freedom of contract” can mask coercion by poverty; and that a minimal state can’t deliver the security markets presuppose.' }
    ]
  },

  {
    slug: 'progressivism',
    name: 'Progressivism',
    tagline: 'Use government to actively reform society.',
    desc: 'What progressivism believes: active reform, expertise, equal opportunity, correcting injustice — and where it sits on the spectrum. FAQs inside.',
    lede: 'Progressivism is the politics of deliberate improvement: identify injustice — in workplaces, politics, or institutions — then use organized government, expertise, and citizen action to fix it. It runs on the optimism that institutions can be made fairer on purpose.',
    pos: { e: 38, c: 75, s: 88, g: 70 },
    extraSources: [
      { label: 'The Progressive Era (United States) — an overview', url: 'https://en.wikipedia.org/wiki/Progressive_Era' }
    ],
    poles: { econ: 'Center-left', civ: 'Liberty-leaning', soc: 'Progressive', geo: 'Globalist-leaning' },
    beliefs: [
      'Injustice is a design problem — institutions can be rebuilt',
      'Government action and regulation to correct market failures',
      'Equality of opportunity as a core measure of fairness',
      'Expertise and evidence in public policy',
      'Expanding political participation; curbing concentrated power',
      'Social change should be pursued actively, not left to time'
    ],
    figures: [
      { name: 'Theodore Roosevelt', life: 'United States, 1858–1919', line: 'Busted trusts, protected wilderness, and made the presidency an instrument of reform.' },
      { name: 'Jane Addams', life: 'United States, 1860–1935', line: 'Turned settlement houses into engines of social reform; won the Nobel Peace Prize.' },
      { name: 'John Dewey', life: 'United States, 1859–1952', line: 'Reimagined education as preparation for democratic participation.' }
    ],
    related: [
      { name: 'Social Democracy', slug: 'social-democracy', chip: 'Neighbour', line: 'Shares the reform agenda; focuses it more tightly on class and welfare.' },
      { name: 'Liberalism', slug: 'liberalism', chip: 'Neighbour', line: 'Shares rights and markets; adds the conviction that government must actively fix injustice.' },
      { name: 'Green Politics', slug: 'green-politics', chip: 'Neighbour', line: 'Applies the progressive method to ecological limits.' }
    ],
    faq: [
      { q: 'What is progressivism in simple terms?', a: 'Society’s problems can be fixed on purpose. Rather than waiting for tradition or markets to sort things out, progressives use government, expertise, and organizing to actively reduce injustice and improve institutions.' },
      { q: 'How is progressivism different from liberalism?', a: 'Liberalism protects individuals from the state; progressivism also uses the state to protect individuals from each other and from concentrated power. Most progressives are also liberals — the difference is emphasis and appetite for intervention.' },
      { q: 'Is progressivism left or right?', a: 'Center-left: typically center-left on economics, liberty-leaning on civil liberties, and strongly progressive on social change.' },
      { q: 'What was the Progressive Era?', a: 'Roughly 1890–1920 in the United States: trust-busting, food and drug regulation, labor laws, women’s suffrage, direct primaries, and the income tax — reform led by figures like Theodore Roosevelt and Jane Addams.' },
      { q: 'Why do progressives trust experts?', a: 'Because the era’s wins — sanitation, regulation, public health — came from applying expertise to public problems. Critics answer that expertise can drift from democratic accountability; modern progressives try to pair the two.' },
      { q: 'What do progressives want today?', a: 'The mix varies by country: campaign-finance and lobbying reform, stronger labor rights, antitrust, climate action, universal services, and criminal-justice reform are common threads.' },
      { q: 'Which parties are progressive?', a: 'In the US, the progressive wing sits inside the Democratic Party; elsewhere, green, left-liberal, and social-democratic parties carry progressive agendas, often under other names.' },
      { q: 'What are the main criticisms of progressivism?', a: 'That reform movements commit the same overreach they fight (early progressivism had nativist strands), that technocracy sidelines democratic choice, and that constant institutional redesign has costs. Progressives reply that the status quo is not neutral.' }
    ]
  },

  {
    slug: 'green-politics',
    name: 'Green Politics',
    tagline: 'Ecological limits first, social justice alongside.',
    desc: 'What green politics believes: ecological limits, climate action, intergenerational justice — and where it sits on the spectrum. A plain-English guide.',
    lede: 'Green politics treats the planet’s carrying capacity as the hard constraint every other policy must respect. Climate action, biodiversity, and intergenerational justice come first — but greens pair them with social justice, grassroots democracy, and nonviolence.',
    pos: { e: 30, c: 72, s: 78, g: 82 },
    extraSources: [
      { label: 'Green parties — the party family, worldwide', url: 'https://en.wikipedia.org/wiki/Green_party' }
    ],
    poles: { econ: 'Center-left', civ: 'Liberty-leaning', soc: 'Progressive', geo: 'Globalist' },
    beliefs: [
      'Ecological limits are real and binding — the economy exists inside the biosphere',
      'Rapid decarbonization and protection of biodiversity',
      'Intergenerational justice: the future gets a vote',
      'Social justice: no one left behind by the transition',
      'Grassroots democracy and decentralization',
      'Nonviolence and international cooperation'
    ],
    figures: [
      { name: 'Petra Kelly', life: 'Germany, 1947–1992', line: 'Co-founded Die Grünen and fused ecology, peace, and human rights into a single movement.' },
      { name: 'Wangari Maathai', life: 'Kenya, 1940–2011', line: 'Planted 30 million trees through the Green Belt Movement; Nobel Peace Prize laureate.' },
      { name: 'Gro Harlem Brundtland', life: 'Norway, born 1939', line: 'Defined “sustainable development” in the 1987 report that gave it its name.' }
    ],
    related: [
      { name: 'Progressivism', slug: 'progressivism', chip: 'Neighbour', line: 'Shares the reform method; greens add hard ecological limits.' },
      { name: 'Social Democracy', slug: 'social-democracy', chip: 'Neighbour', line: 'Shares the welfare core; greens prioritize the planet over growth.' },
      { name: 'Democratic Socialism', slug: 'democratic-socialism', chip: 'Neighbour', line: 'Shares the anti-profit critique; greens ground it in ecology rather than class alone.' }
    ],
    faq: [
      { q: 'What is green politics in simple terms?', a: 'Planetary limits come first. Greens argue no economy or society works on an uninhabitable planet — so climate, biodiversity, and resource use set the boundaries within which everything else is negotiated.' },
      { q: 'Is green politics left or right?', a: 'Mostly left of center — greens pair environmentalism with social justice and are skeptical of unlimited growth — but the movement deliberately refuses a pure left-right frame, and conservationist greens exist on the right too.' },
      { q: 'How is green politics different from ordinary environmentalism?', a: 'Environmentalism can be a single issue within any ideology; green politics is a whole worldview. It links ecology to justice, democracy, peace, and a critique of growth itself, and builds parties around all of it.' },
      { q: 'Do greens want to ban growth?', a: 'Most want to change what grows: decouple prosperity from fossil fuels and raw materials, and grow wellbeing instead of throughput. A “degrowth” current argues rich countries should shrink material use; others rely on technology and pricing.' },
      { q: 'What are green parties’ main policies?', a: 'Carbon pricing and phase-out dates, renewable investment, building retrofits and transit, farming and food reform, conservation — and, for most European greens, strong social programs so transition costs aren’t dumped on the poor.' },
      { q: 'Where did green politics start?', a: 'From 1970s environmental movements and anti-nuclear campaigns. Germany’s Die Grünen (founded 1980) turned it into a party family that is now active across Europe and beyond.' },
      { q: 'Which countries have strong green parties?', a: 'Germany, Austria, Belgium, Finland, and New Zealand have had greens in government; France, Australia, and the UK hold meaningful seats. Greens typically govern in coalition with center-left parties.' },
      { q: 'What are the main criticisms of green politics?', a: 'That decarbonization is costlier or slower than promised, that greens underweight jobs and industry, and that lifestyle politics appeals mainly to the affluent. Greens answer that transition costs are smaller than climate damage — and point to falling renewables prices.' }
    ]
  },

  {
    slug: 'centrism',
    name: 'Centrism',
    tagline: 'Judge each issue on its merits; balance beats ideology.',
    desc: 'What centrism believes: pragmatism, evidence, balance, incremental reform, anti-extremism — and where it sits on the political spectrum. A plain-English guide.',
    lede: 'Centrism is less a set of positions than a method: weigh evidence, split the difference where the evidence is split, distrust grand theories, and build coalitions that can actually govern. Critics call it lukewarm; centrists call it sanity.',
    pos: { e: 50, c: 55, s: 50, g: 50 },
    extraSources: [
      { label: 'Median voter theorem — why competitive politics pulls to the centre', url: 'https://en.wikipedia.org/wiki/Median_voter_theorem' }
    ],
    poles: { econ: 'Center', civ: 'Balanced', soc: 'Mixed', geo: 'Balanced' },
    beliefs: [
      'Pragmatism over ideology — what works matters more than doctrine',
      'Evidence-based policy, revised when the evidence changes',
      'Balance between liberty and equality, markets and the state',
      'Incremental reform over radical redesign',
      'Coalition-building and institutional stability',
      'Resistance to political extremism of any direction'
    ],
    figures: [
      { name: 'Anthony Downs', life: 'United States, 1930–2021', line: 'Showed why competitive politics pulls parties toward the median voter.' },
      { name: 'Angela Merkel', life: 'Germany, born 1954', line: 'Governing by small, reversible steps across sixteen years of coalitions.' },
      { name: 'Emmanuel Macron', life: 'France, born 1977', line: 'Built an explicitly centrist movement around pro-market reform and pro-European openness.' }
    ],
    related: [
      { name: 'Liberalism', slug: 'liberalism', chip: 'Center-right neighbour', line: 'Markets and rights with a smaller state.' },
      { name: 'Social Democracy', slug: 'social-democracy', chip: 'Center-left neighbour', line: 'Markets plus a bigger welfare state.' },
      { name: 'Conservatism', slug: 'conservatism', chip: 'Neighbour', line: 'Borrows prudence and institutional trust without tradition-first.' }
    ],
    faq: [
      { q: 'What is centrism in simple terms?', a: 'Start from problems, not camps. Centrists weigh each issue on the evidence, favor balanced solutions, and distrust any ideology that promises to explain everything.' },
      { q: 'Is centrism an ideology?', a: 'It’s more a temperament or method, but it bundles real commitments: incremental reform, institutional stability, mixed economies, and anti-extremism. Political scientists often treat it as a distinct family.' },
      { q: 'What is the “radical center”?', a: 'A version of centrism that is bold rather than mushy: radical in ambition (climate, institutional reform), centrist in method (evidence, cross-party coalitions). The phrase gained currency in the 2000s and is now widely used.' },
      { q: 'Why do centrists do well in elections?', a: 'Anthony Downs’s median-voter logic: in a two-sided competition, the winner is pulled toward the middle. In multiparty systems, centrist parties can also hold the balance of power in coalitions.' },
      { q: 'What are the criticisms of centrism?', a: 'That “the middle” can be a status-quo bias that delays necessary change, that splitting differences produces mush rather than synthesis, and that centrists drift toward whichever side they need. Centrists reply that most major reform is built from increments.' },
      { q: 'Which politicians are centrist?', a: 'Angela Merkel (pragmatic center-right), Emmanuel Macron (explicitly centrist), and many long-serving coalition leaders. In the US, “centrist” often labels moderate Democrats and Republicans.' },
      { q: 'When does centrism work — and when does it fail?', a: 'It works when problems need patient coalition management; it struggles when a problem demands structural change (climate, housing) or when one side abandons the rules — then compromise reads as weakness.' },
      { q: 'Where does centrism sit on the political spectrum?', a: 'Near the middle of all four dimensions here — center economics, balance on liberties and tradition, mixed global outlook. Real centrists rarely sit exactly at 50 on everything; the label is about method, not coordinates.' }
    ]
  },

  {
    slug: 'national-conservatism',
    name: 'National Conservatism',
    tagline: 'Nation, borders, and tradition before integration.',
    desc: 'What national conservatism believes: sovereignty, borders, tradition, self-government — and where it sits on the spectrum. A plain-English guide.',
    lede: 'National conservatism puts the nation-state at the center of political life: sovereignty over integration, borders over openness, and inherited culture over cosmopolitan pluralism. It accepts a market economy — but reserves the right to steer it for national ends.',
    pos: { e: 60, c: 35, s: 20, g: 12 },
    extraSources: [
      { label: 'Illiberal democracy — the term Orbán popularized', url: 'https://en.wikipedia.org/wiki/Illiberal_democracy' }
    ],
    poles: { econ: 'Center-right', civ: 'Somewhat order-first', soc: 'Traditional', geo: 'Nation-first' },
    beliefs: [
      'National sovereignty and self-government above international bodies',
      'Controlled borders and selective immigration',
      'The nation as a community of shared history, culture, and often faith',
      'Traditional family and social norms in public life',
      'Law and order and a strong national defense',
      'A market economy the nation may steer — industrial policy, strategic sectors'
    ],
    figures: [
      { name: 'Charles de Gaulle', life: 'France, 1890–1970', line: 'The model of sovereignty-first politics: strong state, independent France, a “Europe of nations”.' },
      { name: 'Viktor Orbán', life: 'Hungary, born 1963', line: 'Describes his project as “illiberal democracy” — national-conservative rule inside the EU.' },
      { name: 'Giorgia Meloni', life: 'Italy, born 1977', line: 'Leads Brothers of Italy, a national-conservative party now heading the government.' }
    ],
    related: [
      { name: 'Conservatism', slug: 'conservatism', chip: 'Moderate neighbour', line: 'Shares tradition and prudence; national conservatism adds sovereignty and culture first.' },
      { name: 'Populism', slug: 'populism', chip: 'Neighbour', line: 'Shares the people-vs-elite frame and skepticism of global institutions.' },
      { name: 'Liberalism', slug: 'liberalism', chip: 'Opposite', line: 'Puts individual rights and openness first — the target of national-conservative critique.' }
    ],
    faq: [
      { q: 'What is national conservatism in simple terms?', a: 'The nation comes first: its borders, its laws, its traditions. National conservatives want decisions made domestically rather than by international bodies, controlled immigration, and public life anchored in inherited culture.' },
      { q: 'How is it different from ordinary conservatism?', a: 'It’s conservatism with sovereignty and cultural identity promoted to first principles. Ordinary conservatism manages change prudently; national conservatism mobilizes for cultural and constitutional conflict — with the EU, migration, or “woke” institutions.' },
      { q: 'How is it different from populism?', a: 'They overlap heavily but differ in structure: populism is a people-versus-elite frame that can be left or right; national conservatism is a fuller program — sovereignty, borders, tradition — held by parties that aim to govern durably.' },
      { q: 'What do national conservatives think about the economy?', a: 'They accept markets but subordinate them to the national interest: industrial policy, protection of strategic sectors, and skepticism of global free-trade maximalism. Welfare, they often say, should first serve citizens.' },
      { q: 'Why the hostility to the EU and global institutions?', a: 'Because pooled sovereignty is exactly what they oppose. From their view, treaties and courts that override national parliaments weaken self-government; their answer is cooperation by agreement, not integration.' },
      { q: 'Is national conservatism new?', a: 'The ingredients are old — patriotism, tradition, sovereignty — but the label and its current form date to the 2010s, crystallizing around Brexit, Orbán’s Hungary, and the NatCon conference series.' },
      { q: 'Which parties are national conservative?', a: 'Hungary’s Fidesz, Italy’s Brothers of Italy, the pro-Brexit British right, France’s Rassemblement National, and parts of the US Republican right. Labels vary: “national right”, “sovereigntist”, “new right”.' },
      { q: 'What are the main criticisms of national conservatism?', a: 'That it shades from patriotism into exclusion of minorities, that border control alone can’t manage migration or climate, and that appeals to “sovereignty” can excuse democratic backsliding — critics point to Hungary. Supporters reply that self-government and cultural cohesion are preconditions of any healthy democracy.' }
    ]
  },

  {
    slug: 'populism',
    name: 'Populism',
    tagline: 'The people against the elite — on both left and right.',
    desc: 'What populism believes: popular sovereignty, anti-elitism, distrust of institutions — and why it appears on both left and right. A plain-English guide.',
    lede: 'Populism is a frame, not a fixed platform: society is split into “the people” and “the corrupt elite”, and politics should return power to the former. It can lean left (against bankers and corporations) or right (against cultural elites and global institutions) — what’s constant is the confrontation.',
    pos: { e: 48, c: 42, s: 38, g: 14 },
    extraSources: [
      { label: 'Stanford Encyclopedia of Philosophy: Populism', url: 'https://plato.stanford.edu/entries/populism/' }
    ],
    poles: { econ: 'Center', civ: 'Somewhat order-first', soc: 'Somewhat traditional', geo: 'Nation-first' },
    beliefs: [
      'Sovereignty belongs to “the people”, not to institutions or experts',
      'The establishment — parties, courts, media, technocrats — serves itself',
      'Direct tools of democracy: referendums, term limits, recall',
      'Majoritarian decision-making over elite mediation',
      'Left-populists target economic elites; right-populists target cultural ones',
      'National interest and closed or selective borders'
    ],
    figures: [
      { name: 'Juan Perón', life: 'Argentina, 1893–1974', line: 'Built the classic mid-century people-versus-oligarchy movement that still structures Argentine politics.' },
      { name: 'Hugo Chávez', life: 'Venezuela, 1954–2013', line: 'Left-populist rule — oil-funded social programs and attacks on institutions — with authoritarian drift.' },
      { name: 'Donald Trump', life: 'United States, born 1946', line: 'Right-populist presidency: anti-establishment appeals, nationalism, distrust of media and institutions.' }
    ],
    related: [
      { name: 'National Conservatism', slug: 'national-conservatism', chip: 'Right neighbour', line: 'A fuller program that natcon-populist parties often converge on.' },
      { name: 'Democratic Socialism', slug: 'democratic-socialism', chip: 'Left neighbour', line: 'Left-populism borrows its anti-oligarchy economics without the full ownership program.' },
      { name: 'Centrism', slug: 'centrism', chip: 'Opposite', line: 'The establishment method populism defines itself against.' }
    ],
    faq: [
      { q: 'What is populism in simple terms?', a: 'Politics as “the people versus the elite”. Populists claim ordinary people share a common interest that a corrupt establishment — parties, courts, media, experts — ignores, and they promise to give power back.' },
      { q: 'Is populism left or right?', a: 'Both. Left-populism targets bankers, corporations, and oligarchs (Chávez, Spain’s Podemos, Sanders-style rhetoric); right-populism targets cultural elites, immigration, and global institutions (Trump, France’s RN). The style is shared; the villains differ.' },
      { q: 'Is populism democratic — or a threat to democracy?', a: 'Both readings exist, and populists straddle them. It’s democratic in claiming to restore popular sovereignty and turnout; it’s destabilizing when “the people” means only supporters, and courts, press, and minorities become enemies. The record ranges from renewed participation to democratic breakdown.' },
      { q: 'Why is populism rising?', a: 'Stagnant wages, austerity, migration shocks, and the 2008 financial crisis eroded trust in mainstream parties; social media rewards confrontation over coalition. Populism supplies blame, identity, and simplicity.' },
      { q: 'How is populism different from fascism?', a: 'Fascism adds a cult of violence, one-party dictatorship, and the suppression of all pluralism. Populism can stay electoral; fascism by definition cannot. Overlaps appear when populists dismantle checks — which is why scholars watch the trajectory, not just the label.' },
      { q: 'Which parties are populist?', a: 'Argentina’s Peronists, Italy’s Five Star Movement, France’s Rassemblement National, the US MAGA current, Spain’s Podemos, Hungary’s Fidesz (nationalist-populist) — and dozens more. It is a global political style.' },
      { q: 'What do populists actually do in office?', a: 'Deliver visible benefits fast (cash transfers, pensions), attack intermediaries (courts, media, central banks), centralize power, and lean on referendums. Performance depends heavily on institutions and available resources.' },
      { q: 'What are the main criticisms of populism?', a: 'That “the people” is a fiction covering majoritarianism, that scapegoating corrodes minority rights, and that simple promises meet complex problems. Populists answer that establishment politics ignored real grievances for decades.' }
    ]
  }
];

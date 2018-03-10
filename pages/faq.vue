<template>
    <div class="page">
        <section class="hero is-primary hero-main">
            <div class="hero-head">
                <navbar></navbar>
            </div>
            <div class="hero-body">
                <section class="section container crypto-faq">
                    <h1 class="title has-text-centered">
                        Časté otázky o kryptomenách (FAQ)
                    </h1>
                    <h2 class="title">Čo je kryptomena?</h2>
                    <p>
                        Kryptomeny sú digitálna forma peňazí. Sú kryptograficky chránené proti manipulácii.
                Medzi najpopulárnejšie kryptomeny patrí Bitcoin a Ethereum. Existuje však viac ako tisíc alternatívnych kryptomien a nové vznikajú každý deň.
                Jeden z hlavných rozdielov oproti tradičným menám je ich decentralizácia podobne ako je tomu pri internete a fakt, že nikto nemôže zmeniť počet mincí v obehu čo zabraňuje inflácii.
                Kryptomeny nie sú ovládané žiadnou inštitúciou, bankou a ani štátom a neexistujú pre nich hranice či regulácie.
                    </p>

                    <h2 class="title">Ako kryptomeny začali?</h2>
                    <p>
                        Prvá kryptomena, s ktorou sa začalo obchodovať, bol Bitcoin v roku 2009 (3. januára  2009 bol vytvorený prvý blok v blockchaine (reťazi blokov) tzv. Bitcoin Genesis Block) 
                        a za jej autora sa považuje človek s prezývkou Satoshi Nakamoto (táto osoba v reálnom živote neexistuje a môže ísť kľudne aj o skupinu ľudí).
                    </p>

                    <h2 class="title">Prečo existuje mnoho kryptomien?</h2>
                    <p>
                        Každá kryptomena má rozdielny ciel a niektoré sa snažia byť viac ako len prostriedok ma výmenu peňazí. Ethereum okrem presunu peňazí funguje aj ako jeden celosvetový super počítač, na ktorom vďaka Smart Kontraktom môže ktokoľvek vytvoriť a spúštať aplikácie. 
                    </p>

                    <h2 class="title">Ako investovať do kryptomien?</h2>
                    <p>
                        Kryptomeny patria medzi veľmi riskantné investície. Denné výkyvy niekedy dosahujú až 50% hodnoty a preto je veľmi dôležité investovať iba toľko, koľko si môžeme dovoliť stratiť. Najjednoduchšia cesta ako začať je registovať sa na Coinbase. Po registrácií a overení identity prevediete peniaze bankovým prevodom podľa inštrukcií a potom si môžete kúpiť jednu z poskytovaných kryptomien: Bitcoin, Ethereum, Litecoin a Bitcoin Cash.
                    </p>

                    <h2 class="title">Ako sa "skladujú" kryptomeny?</h2>
                    <p>
                        Krypto mince (coins) sa uchovávajú v takzvaných digitálnych peňaženkách (wallets). Peňaženka sa skladá z dvoch kľúčov, verejný a súkromný. Verejný kľúč je adresa na ktorú Vám niekto može poslať mince. Privátny kľúč je niečo ako heslo ktoré overí, že ste vlastníkom danej peňaženky a dovolí Vám s ňou narábať a posielať z nej mince.
                    </p>
                    </section>
            </div>
        </section>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.crypto-faq {
  .title {
    color: $palette-text;
  }

  p {
    margin: 0 0 2rem 0;
  }
}
</style>

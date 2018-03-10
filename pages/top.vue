<template>
  <div class="page">
    <section class="hero is-primary hero-main">
      <div class="hero-head">
        <navbar></navbar>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="brand-heading">
            <img class="brand-icon" src="/logo.png" alt="cenakrypto.sk">
            cenakrypto.sk
          </h1>

          <h2 class="title">
            Aktuálna cena kryptomien
          </h2>
          <div class="columns top-currencies">
            <nuxt-link
              class="column currency-box"
              v-for="(currency, index) of topCurrencies"
              :key="currency.short"
              :to="{name: 'coin-symbol', params: {symbol: currency.short}}"
            >
              <div class="currency-name">
                <coin-icon
                  className="currency-icon"
                  :symbol="currency.short">
                </coin-icon>
                {{ currency.short }}
              </div>
              <div class="currency-name-long">
                <span class="muted-text">
                  {{ index + 1 }}. 
                </span>
                {{ currency.long }}
              </div>
              <div class="current-price">
                {{ currency.price | formatNumbers(2) }}
                <span class="muted-text">
                  €
                </span>
              </div>
              <div class="currency-change">
                <pretty-change-perc :percent="currency.perc">
                  <span slot="post">
                    <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                    <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
                  </span>
                </pretty-change-perc>
              </div>
            </nuxt-link>
          </div>

          <h3 class="title">
            Ďalšie kryptomeny
          </h3>
          <div class="columns small-currencies">
            <nuxt-link
              class="column currency-box-small"
              v-for="currency of smallCurrencies"
              :key="currency.short"
              :to="{name: 'coin-symbol', params: {symbol: currency.short}}"
            >
              <div class="currency-name">
                <coin-icon
                  className="currency-icon"
                  :symbol="currency.short">
                </coin-icon>
                {{ currency.short }}
                </div>
              <div class="current-price">
                {{ currency.price | formatNumbers(2) }}
                <span class="muted-text">
                  €
                </span>
              </div>
              <div class="currency-change">
                <pretty-change-perc :percent="currency.perc">
                  <span slot="post">
                    <i v-if="currency.perc >= 0" class="fas fa-chevron-up" />
                    <i v-if="currency.perc < 0" class="fas fa-chevron-down" />
                  </span>
                </pretty-change-perc>
              </div>
            </nuxt-link>
          </div>

          <nuxt-link
            class="button primary-button"
            :to="{name: 'list'}"
          >
            <i class="fas fa-list-ol"></i>
            Zobraziť všetky kryptomeny
          </nuxt-link>
        </div>
      </div>
    </section>

    <page-footer></page-footer>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import Navbar from '@/components/Navbar'
import PageFooter from '@/components/PageFooter'
import Cta from '@/components/Cta'
import CoinIcon from '@/components/CoinIcon'
import Steemit from '@/components/Steemit'
import PrettyChangePerc from '@/components/PrettyChangePerc'
import { API_ROOT } from '@/constants'

export default {
  name: 'Front',
  data() {
    return {
      topCurrencies: [],
      smallCurrencies: []
    };
  },

  created() {
      axios.get(`${API_ROOT}/front`)
      .then(response => {
        this.topCurrencies = response.data.data.slice(0, 3);
        this.smallCurrencies = response.data.data.slice(3, 10);
      })
  },

  components: {
    Navbar,
    PageFooter,
    Cta,
    CoinIcon,
    PrettyChangePerc,
    Steemit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~bulma/sass/utilities/mixins";
@import '../assets/variables';

.primary-button {
  display: inline-block;
  margin: 2rem auto 0 auto;
  background: lighten($palette-accent, 10%);
  border: none;
  border-radius: 40px;
  padding: 1rem 2.5rem;
  height: auto;
  color: $palette-text;
  transition: 300ms all ease-in-out;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;

  &:hover {
    background: lighten($palette-hero, 10%);
    transform: translateY(-2px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.3);
  }
}

.top-currencies {
  margin: 2rem 0;
  min-height: 240px;
}

.small-currencies {
  margin: 2rem 0;
  min-height: 160px;
}

.brand-heading {
  font-size: 2rem;
}

.brand-icon {
  width: 40px;
  height: auto;
  vertical-align: middle;
  margin: 0 0.5rem;
}

.red {
  color: $red;
}

.green {
  color: $green;
}

.currency-box {
  position: relative;
  margin: 1rem 1.5rem;
  padding: 1rem 0.5rem;
  border-radius: 16px;
  transition: all 300ms ease-in-out;

  @include mobile() {
    &:not(:last-child):after {
      display: none;
    }
  }

  &:hover {
    box-shadow: 0 3px 12px fade-out(#202020, 0.8);
    background: $palette-accent;
  }

  &:not(:last-child):after {
    content: " ";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: fade-out($palette-text, 0.8);
    right: -25px;
    height: 50%;
    transform: translateY(50%);
  }

  .currency-name {
    font-size: 1.2rem;
  }

  .currency-name-long {
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 0.5rem;
  }

  .current-price {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0.3rem 0;
  }

  .currency-change {
    font-size: 1.6rem;
  }

  .currency-icon {
    vertical-align: middle;
    width: 32px;
    margin-top: -3px;
    margin-right: 3px;
  }
}

.currency-box-small {
  margin: 1rem 0.2rem;
  padding: 1.2rem 0.2rem 0.7rem 0.2rem;
  border-radius: 16px;
  transition: background-color 300ms ease-in-out;

  &:hover {
    box-shadow: 0 3px 12px fade-out(#202020, 0.7);
    background: $palette-accent;
  }

  .currency-name {
    font-size: 1.2rem;
  }

  .current-price {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0.5rem 0;
  }

  .currency-change {
    font-size: 1rem;
  }

  .currency-icon {
    vertical-align: middle;
    width: 24px;
    margin-top: -5px;
    margin-right: 3px;
  }
}
</style>

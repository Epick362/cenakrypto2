<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item brand-navbar-item" to="/">
          <span class="icon">
            <img src="/logo.png" alt="cenakrypto.sk">
          </span>
        </nuxt-link>
        <label class="navbar-burger burger" for="nav-toggle-state">
          <span />
          <span />
          <span />
        </label>
      </div>

      <input type="checkbox" id="nav-toggle-state" />

      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" :to="{name: 'faq'}">
            Čo sú to kryptomeny?
          </nuxt-link>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
            <autocomplete
              v-if="coins.length > 0"
              input-class="search-input"
              :list="coins"
              property="symbol"
              placeholder="Vyhľadávanie..."
            >
              <div
                slot="item"
                slot-scope="props">
                <coin-icon
                  className="currency-icon"
                  :symbol="props.symbol">
                </coin-icon>
                {{ props.fullName }} (<b>{{ props.symbol }}</b>)
              </div>
            </autocomplete>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { API_ROOT } from "@/constants";
import Autocomplete from "@/components/Autocomplete";
import CoinIcon from "@/components/CoinIcon";
import { autocompleteBus } from "@/components/autocompleteBus";

export default {
  name: "navbar",
  data() {
    return {
      coins: []
    };
  },
  created() {
    this.loadCoins();

    autocompleteBus.$on("autocomplete-select", selectedValue => {
      this.$router.push({ name: "coin-symbol", params: { symbol: selectedValue } });
    });
  },
  methods: {
    loadCoins() {
      return axios.get(`${API_ROOT}/coins`).then(response => {
        this.coins = response.data;
      });
    },
    show() {
      this.$modal.show("dialog", {
        title: "Upozornenie!",
        text:
          "Investovanie do kryptomien so sebou prináša svoje riziká. Nepreberám žiadnu zodpovednosť za možné finančné straty.",
        buttons: [
          {
            title: '<span style="color: #FF4400">Zrušiť</span>'
          },
          {
            title:
              '<span style="color: #20bc56;font-size: 0.9rem;font-weight:bold;">Rozumiem, pokračovať</span>',
            default: true,
            handler: () => {
              window.open(
                "https://www.coinbase.com/join/594d5ece3f676a05e495611b",
                "_blank"
              );
            } // Button click handler
          }
        ]
      });
    }
  },
  components: {
    Autocomplete,
    CoinIcon
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/variables";

#nav-toggle-state {
  display: none;
}

#nav-toggle-state:checked ~ .navbar-menu {
  background: linear-gradient(transparent, lighten($palette-hero, 10%));
  display: block;
}

.currency-icon {
  vertical-align: middle;
  width: 30px;
  height: auto;
  margin-top: -5px;
}

.cta-button {
  border-radius: 20px;
  padding: 0.375rem 1.5rem;
  background: darken($green, 5%);
  color: $palette-text;
  border: none;
  transition: 300ms all ease-in-out;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    background: darken($green, 15%);
    transform: translateY(2px);
  }
}

.cancel {
  color: $red;
}

.confirm {
  color: $green;
  font-size: 1.2rem;
}
</style>

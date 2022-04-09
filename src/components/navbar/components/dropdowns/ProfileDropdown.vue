<template>
  <va-dropdown
    class="profile-dropdown"
    v-model="isShown"
    boundary-body
    position="bottom"
    :offset="[0, 13]"
  >
    <template #anchor>
      <span class="profile-dropdown__anchor">
        <slot/>
        <va-icon
          class="px-2"
          :name="isShown ? 'angle_up' :'angle_down'"
          :color="theme.primary"
        />
      </span>
    </template>
    <va-dropdown-content class="profile-dropdown__content">
      <va-list-item
        v-for="option in options"
        :key="option.name"
        @click="onClick(option.name)"
      >
        <router-link
          :to="{name: option.redirectTo}"
          class="profile-dropdown__item"
        >
          {{ $t(`user.${option.name}`) }}
        </router-link>
      </va-list-item>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
import { useGlobalConfig } from "vuestic-ui";
import { mapActions, mapGetters } from "vuex";
import { VaDropdown, VaDropdownContent, VaListItem, VaIcon } from "vuestic-ui";

export default {
  name: "profile-section",
  components: { VaDropdown, VaDropdownContent, VaListItem, VaIcon },
  data() {
    return {
      isShown: false,
    };
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: "profile",
          redirectTo: "",
        },
        {
          name: "logout",
          redirectTo: "login",
        },
      ],
    },
  },
  computed: {
    ...mapGetters("user", ["getUserName"]),
    theme() { return useGlobalConfig().getGlobalConfig(); },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    onClick(name) {
      if (name === "logout") {
        this.logout();
      } else if (name === "profile") {
        this.$router.push({ name: "profile", params: { username: this.getUserName } });
      }
    },
  },
};
</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  .va-dropdown-popper__anchor {
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    width: 8rem;
  }

  &__item {
    display: block;
    color: var(--va-gray);

    &:hover,
    &:active {
      color: var(--va-primary);
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>

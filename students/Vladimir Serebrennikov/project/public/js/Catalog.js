export default Vue.component('catalog', {
  data() {
    return {
      items: [],
      imgCatalog: 'https://placehold.it/200x150',
      catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
    }
  },
  template: `
    <div>catalog
      <catalog-item ></catalog-item>
    </div>
  `,
});

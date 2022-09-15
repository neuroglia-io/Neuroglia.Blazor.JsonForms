namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class CategorizationCategoryUnionJsonConverter : System.Text.Json.Serialization.JsonConverter<CategorizationCategoryUnion>
    {
        public override CategorizationCategoryUnion Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new CategorizationCategoryUnion { CategorizationValue = System.Text.Json.JsonSerializer.Deserialize<Categorization>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new CategorizationCategoryUnion { CategoryValue = System.Text.Json.JsonSerializer.Deserialize<Category>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, CategorizationCategoryUnion value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(Categorization)) { System.Text.Json.JsonSerializer.Serialize(writer, value.CategorizationValue, options); return; }
            if (value.Type == typeof(Category)) { System.Text.Json.JsonSerializer.Serialize(writer, value.CategoryValue, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(CategorizationCategoryUnionJsonConverter))]
    struct CategorizationCategoryUnion
    {
        public System.Type? Type { get; set; }
        private Categorization? _categorizationValue;
        public Categorization? CategorizationValue
        {
            get => _categorizationValue;
            set
            {
                ClearValue();
                _categorizationValue = value;
                Type = typeof(Categorization);
            }
        }
        public static implicit operator CategorizationCategoryUnion(Categorization value) => new CategorizationCategoryUnion { CategorizationValue = value };
        public static implicit operator Categorization?(CategorizationCategoryUnion value) => value.CategorizationValue;

        private Category? _categoryValue;
        public Category? CategoryValue
        {
            get => _categoryValue;
            set
            {
                ClearValue();
                _categoryValue = value;
                Type = typeof(Category);
            }
        }
        public static implicit operator CategorizationCategoryUnion(Category value) => new CategorizationCategoryUnion { CategoryValue = value };
        public static implicit operator Category?(CategorizationCategoryUnion value) => value.CategoryValue;

        public override string? ToString()
        {
            if (Type == typeof(Categorization)) return CategorizationValue?.ToString();
            if (Type == typeof(Category)) return CategoryValue?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(Categorization)) return CategorizationValue?.GetHashCode() ?? 0;
            if (Type == typeof(Category)) return CategoryValue?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _categorizationValue = default;
            _categoryValue = default;
        }
    }
}

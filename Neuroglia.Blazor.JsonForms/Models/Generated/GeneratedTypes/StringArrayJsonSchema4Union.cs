namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class StringArrayJsonSchema4UnionJsonConverter : System.Text.Json.Serialization.JsonConverter<StringArrayJsonSchema4Union>
    {
        public override StringArrayJsonSchema4Union Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new StringArrayJsonSchema4Union { StringArrayValue = System.Text.Json.JsonSerializer.Deserialize<string[]>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new StringArrayJsonSchema4Union { JsonSchema4Value = System.Text.Json.JsonSerializer.Deserialize<JsonSchema4>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, StringArrayJsonSchema4Union value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(string[])) { System.Text.Json.JsonSerializer.Serialize(writer, value.StringArrayValue, options); return; }
            if (value.Type == typeof(JsonSchema4)) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema4Value, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(StringArrayJsonSchema4UnionJsonConverter))]
    struct StringArrayJsonSchema4Union
    {
        public System.Type? Type { get; set; }
        private string[]? _stringArrayValue;
        public string[]? StringArrayValue
        {
            get => _stringArrayValue;
            set
            {
                ClearValue();
                _stringArrayValue = value;
                Type = typeof(string[]);
            }
        }
        public static implicit operator StringArrayJsonSchema4Union(string[] value) => new StringArrayJsonSchema4Union { StringArrayValue = value };
        public static implicit operator string[]?(StringArrayJsonSchema4Union value) => value.StringArrayValue;

        private JsonSchema4? _jsonSchema4Value;
        public JsonSchema4? JsonSchema4Value
        {
            get => _jsonSchema4Value;
            set
            {
                ClearValue();
                _jsonSchema4Value = value;
                Type = typeof(JsonSchema4);
            }
        }
        public static implicit operator StringArrayJsonSchema4Union(JsonSchema4 value) => new StringArrayJsonSchema4Union { JsonSchema4Value = value };
        public static implicit operator JsonSchema4?(StringArrayJsonSchema4Union value) => value.JsonSchema4Value;

        public override string? ToString()
        {
            if (Type == typeof(string[])) return StringArrayValue?.ToString();
            if (Type == typeof(JsonSchema4)) return JsonSchema4Value?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(string[])) return StringArrayValue?.GetHashCode() ?? 0;
            if (Type == typeof(JsonSchema4)) return JsonSchema4Value?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _stringArrayValue = default;
            _jsonSchema4Value = default;
        }
    }
}

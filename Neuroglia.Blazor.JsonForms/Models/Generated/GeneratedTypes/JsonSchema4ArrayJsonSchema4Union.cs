namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class JsonSchema4ArrayJsonSchema4UnionJsonConverter : System.Text.Json.Serialization.JsonConverter<JsonSchema4ArrayJsonSchema4Union>
    {
        public override JsonSchema4ArrayJsonSchema4Union Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new JsonSchema4ArrayJsonSchema4Union { JsonSchema4ArrayValue = System.Text.Json.JsonSerializer.Deserialize<JsonSchema4[]>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new JsonSchema4ArrayJsonSchema4Union { JsonSchema4Value = System.Text.Json.JsonSerializer.Deserialize<JsonSchema4>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, JsonSchema4ArrayJsonSchema4Union value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(JsonSchema4[])) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema4ArrayValue, options); return; }
            if (value.Type == typeof(JsonSchema4)) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema4Value, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(JsonSchema4ArrayJsonSchema4UnionJsonConverter))]
    struct JsonSchema4ArrayJsonSchema4Union
    {
        public System.Type? Type { get; set; }
        private JsonSchema4[]? _jsonSchema4ArrayValue;
        public JsonSchema4[]? JsonSchema4ArrayValue
        {
            get => _jsonSchema4ArrayValue;
            set
            {
                ClearValue();
                _jsonSchema4ArrayValue = value;
                Type = typeof(JsonSchema4[]);
            }
        }
        public static implicit operator JsonSchema4ArrayJsonSchema4Union(JsonSchema4[] value) => new JsonSchema4ArrayJsonSchema4Union { JsonSchema4ArrayValue = value };
        public static implicit operator JsonSchema4[]?(JsonSchema4ArrayJsonSchema4Union value) => value.JsonSchema4ArrayValue;

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
        public static implicit operator JsonSchema4ArrayJsonSchema4Union(JsonSchema4 value) => new JsonSchema4ArrayJsonSchema4Union { JsonSchema4Value = value };
        public static implicit operator JsonSchema4?(JsonSchema4ArrayJsonSchema4Union value) => value.JsonSchema4Value;

        public override string? ToString()
        {
            if (Type == typeof(JsonSchema4[])) return JsonSchema4ArrayValue?.ToString();
            if (Type == typeof(JsonSchema4)) return JsonSchema4Value?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(JsonSchema4[])) return JsonSchema4ArrayValue?.GetHashCode() ?? 0;
            if (Type == typeof(JsonSchema4)) return JsonSchema4Value?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _jsonSchema4ArrayValue = default;
            _jsonSchema4Value = default;
        }
    }
}

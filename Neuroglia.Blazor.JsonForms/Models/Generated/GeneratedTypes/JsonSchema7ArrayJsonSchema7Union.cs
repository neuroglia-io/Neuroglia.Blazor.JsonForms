namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class JsonSchema7ArrayJsonSchema7UnionJsonConverter : System.Text.Json.Serialization.JsonConverter<JsonSchema7ArrayJsonSchema7Union>
    {
        public override JsonSchema7ArrayJsonSchema7Union Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new JsonSchema7ArrayJsonSchema7Union { JsonSchema7ArrayValue = System.Text.Json.JsonSerializer.Deserialize<JsonSchema7[]>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new JsonSchema7ArrayJsonSchema7Union { JsonSchema7Value = System.Text.Json.JsonSerializer.Deserialize<JsonSchema7>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, JsonSchema7ArrayJsonSchema7Union value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(JsonSchema7[])) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema7ArrayValue, options); return; }
            if (value.Type == typeof(JsonSchema7)) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema7Value, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(JsonSchema7ArrayJsonSchema7UnionJsonConverter))]
    struct JsonSchema7ArrayJsonSchema7Union
    {
        public System.Type? Type { get; set; }
        private JsonSchema7[]? _jsonSchema7ArrayValue;
        public JsonSchema7[]? JsonSchema7ArrayValue
        {
            get => _jsonSchema7ArrayValue;
            set
            {
                ClearValue();
                _jsonSchema7ArrayValue = value;
                Type = typeof(JsonSchema7[]);
            }
        }
        public static implicit operator JsonSchema7ArrayJsonSchema7Union(JsonSchema7[] value) => new JsonSchema7ArrayJsonSchema7Union { JsonSchema7ArrayValue = value };
        public static implicit operator JsonSchema7[]?(JsonSchema7ArrayJsonSchema7Union value) => value.JsonSchema7ArrayValue;

        private JsonSchema7? _jsonSchema7Value;
        public JsonSchema7? JsonSchema7Value
        {
            get => _jsonSchema7Value;
            set
            {
                ClearValue();
                _jsonSchema7Value = value;
                Type = typeof(JsonSchema7);
            }
        }
        public static implicit operator JsonSchema7ArrayJsonSchema7Union(JsonSchema7 value) => new JsonSchema7ArrayJsonSchema7Union { JsonSchema7Value = value };
        public static implicit operator JsonSchema7?(JsonSchema7ArrayJsonSchema7Union value) => value.JsonSchema7Value;

        public override string? ToString()
        {
            if (Type == typeof(JsonSchema7[])) return JsonSchema7ArrayValue?.ToString();
            if (Type == typeof(JsonSchema7)) return JsonSchema7Value?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(JsonSchema7[])) return JsonSchema7ArrayValue?.GetHashCode() ?? 0;
            if (Type == typeof(JsonSchema7)) return JsonSchema7Value?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _jsonSchema7ArrayValue = default;
            _jsonSchema7Value = default;
        }
    }
}

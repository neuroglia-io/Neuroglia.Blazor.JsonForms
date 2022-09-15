namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class JsonSchema4BoolUnionJsonConverter : System.Text.Json.Serialization.JsonConverter<JsonSchema4BoolUnion>
    {
        public override JsonSchema4BoolUnion Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new JsonSchema4BoolUnion { JsonSchema4Value = System.Text.Json.JsonSerializer.Deserialize<JsonSchema4>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new JsonSchema4BoolUnion { BoolValue = System.Text.Json.JsonSerializer.Deserialize<bool>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, JsonSchema4BoolUnion value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(JsonSchema4)) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema4Value, options); return; }
            if (value.Type == typeof(bool)) { System.Text.Json.JsonSerializer.Serialize(writer, value.BoolValue, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(JsonSchema4BoolUnionJsonConverter))]
    struct JsonSchema4BoolUnion
    {
        public System.Type? Type { get; set; }
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
        public static implicit operator JsonSchema4BoolUnion(JsonSchema4 value) => new JsonSchema4BoolUnion { JsonSchema4Value = value };
        public static implicit operator JsonSchema4?(JsonSchema4BoolUnion value) => value.JsonSchema4Value;

        private bool? _boolValue;
        public bool? BoolValue
        {
            get => _boolValue;
            set
            {
                ClearValue();
                _boolValue = value;
                Type = typeof(bool);
            }
        }
        public static implicit operator JsonSchema4BoolUnion(bool value) => new JsonSchema4BoolUnion { BoolValue = value };
        public static implicit operator bool?(JsonSchema4BoolUnion value) => value.BoolValue;

        public override string? ToString()
        {
            if (Type == typeof(JsonSchema4)) return JsonSchema4Value?.ToString();
            if (Type == typeof(bool)) return BoolValue?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(JsonSchema4)) return JsonSchema4Value?.GetHashCode() ?? 0;
            if (Type == typeof(bool)) return BoolValue?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _jsonSchema4Value = default;
            _boolValue = default;
        }
    }
}

namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class JsonSchema7BoolUnionJsonConverter : System.Text.Json.Serialization.JsonConverter<JsonSchema7BoolUnion>
    {
        public override JsonSchema7BoolUnion Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new JsonSchema7BoolUnion { JsonSchema7Value = System.Text.Json.JsonSerializer.Deserialize<JsonSchema7>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new JsonSchema7BoolUnion { BoolValue = System.Text.Json.JsonSerializer.Deserialize<bool>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, JsonSchema7BoolUnion value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(JsonSchema7)) { System.Text.Json.JsonSerializer.Serialize(writer, value.JsonSchema7Value, options); return; }
            if (value.Type == typeof(bool)) { System.Text.Json.JsonSerializer.Serialize(writer, value.BoolValue, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(JsonSchema7BoolUnionJsonConverter))]
    struct JsonSchema7BoolUnion
    {
        public System.Type? Type { get; set; }
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
        public static implicit operator JsonSchema7BoolUnion(JsonSchema7 value) => new JsonSchema7BoolUnion { JsonSchema7Value = value };
        public static implicit operator JsonSchema7?(JsonSchema7BoolUnion value) => value.JsonSchema7Value;

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
        public static implicit operator JsonSchema7BoolUnion(bool value) => new JsonSchema7BoolUnion { BoolValue = value };
        public static implicit operator bool?(JsonSchema7BoolUnion value) => value.BoolValue;

        public override string? ToString()
        {
            if (Type == typeof(JsonSchema7)) return JsonSchema7Value?.ToString();
            if (Type == typeof(bool)) return BoolValue?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(JsonSchema7)) return JsonSchema7Value?.GetHashCode() ?? 0;
            if (Type == typeof(bool)) return BoolValue?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _jsonSchema7Value = default;
            _boolValue = default;
        }
    }
}

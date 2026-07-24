def pagination_params(page: int = 1, size: int = 20) -> dict[str, int]:
  return {"page": page, "size": size}

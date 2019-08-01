export async function CallUseCase<T>(useCase: any, presenter: { response: any }, request?: any): Promise<{ response: T }> {
  const params: any[] = [];
  if (request) {
    params.push(request);
  }
  params.push(presenter);
  await useCase.execute(...params);
  return presenter;
}
